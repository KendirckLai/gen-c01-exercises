import express, { Request, Response } from "express";
import { client } from "./main";
import { User } from "./models";
import { checkPassword } from "./hash";
import { hashPassword } from "./hash";
import fetch from "node-fetch";

export const userRoutes = express.Router();

userRoutes.get("/users", getUser);
userRoutes.put("/users", editUser);
userRoutes.get("/login/gitlab/", loginGitlab);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await client.query(`SELECT * from users where username = $1`, [username]);
  const users: User[] = result.rows;
  const user = users[0];
  if (user && await checkPassword(password, user.password)) {
    if (req.session) {
      req.session.user = user;
    }
    res.redirect('/admin/admin-read-jobs/admin-read-jobs.html');
  } else {
    res.status(401).redirect("/?error=login+failed");
  }
};

async function loginGitlab(req: Request, res: Response) {
  const accessToken = req.session?.grant.response.access_token;
  try {
    const fetchResAccess = await fetch(`https://gitlab.com/api/v4/user?access_token=${accessToken}`, {
      method: "GET"
    });
    const result = await fetchResAccess.json();

    const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
    let user = users[0];
    // let isUploadInfo = false;

    if (!user) {
      await client.query(`INSERT INTO users (username,password,first_name,last_name) values ($1,$2,$3,$4) RETURNING *`
        , [result.email, await hashPassword(Math.random().toString(36).substring(2)), (result.name.split(' ')[0]), (result.name.split(' ')[1])]);
      const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
      user = users[0]
      if (req.session) {
        req.session.user = user;
      }
      if (!user.username.match('tecky')) {
        await client.query(`UPDATE users SET role = 'student' where id = $1`, [user.id]);
        const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
        user = users[0]
        if (user.role === "student") {
          // isUploadInfo = true;
          res.redirect('/graduate/upload-student-info/upload-student-info.html');
          return
        }
      } else {
        await client.query(`UPDATE users SET role = 'admin' where id = $1`, [user.id]);
        res.redirect('/admin/admin-graduate-status/admin-graduate-status.html');
        return
      }
    } else {
      if (req.session) {
        req.session.user = user;
        // SELECT COUNT(*) ...
        const students = (await client.query(`SELECT * from students where user_id = $1`, [user.id])).rows;
        let student = students[0];
        // if (!student) {
        //   isUploadInfo = true;
        // }
        if (req.session.user.role === "admin") {
          res.redirect('/admin/admin-graduate-status/admin-graduate-status.html');
          return
        } else {
          if (student?.user_id === user.id) {
            res.redirect('/graduate/graduate-profile/graduate-profile.html')
            return
          } else {
            res.redirect('/graduate/upload-student-info/upload-student-info.html')
            return
          }
        }
      }

      // if (user.role === "admin") {
      //   res.redirect('/admin/admin-graduate-status/admin-graduate-status.html');
      //   return
      // }
      // if (isUploadInfo) {
      //   res.redirect('/graduate/upload-student-info/upload-student-info.html')
      // } else {
      //   res.redirect('/graduate/graduate-profile/graduate-profile.html')
      // }
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function getUser(req: Request, res: Response) {
  if (req.session) {
    res.json(req.session.user);
  } else {
    res.status(401).redirect("/?error=login+failed");
  }
}

async function editUser(req: Request, res: Response) {
  const { firstName, lastName, username } = req.body;
  const userId = req.session?.user.id;
  await client.query(`UPDATE users SET first_name = $1, last_name = $2, username = $3 where id = $4`, [firstName, lastName, username, userId]);
  const users = (await client.query(`SELECT * FROM users WHERE id = $1`, [userId])).rows;
  let user = users[0]
  if (req.session) {
    req.session.user = user
  }
  res.json({ success: true });
}

async function logout(req: Request, res: Response) {
  if (req.session) {
    delete req.session.user;
  }
  res.redirect("/");
}

// async function getGitlabToken(req: Request, res: Response) {
//     if (req.body.code == null || req.body.code == "") {
//         res.status(401).json({ message: "No auth code provided." })
//         return;
//     }

//     const fetchRes = await fetch("https://gitlab.com/oauth/token", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             client_id: process.env.GITLAB_APPLICATION_ID,
//             client_secret: process.env.GITLAB_SECRET,
//             code: req.body.code,
//             grant_type: 'authorization_code',
//             redirect_uri: process.env.GITLAB_REDIRECT_URI
//         })
//     })

//     const tokenJson = await fetchRes.json();
//     if (tokenJson.access_token == null || tokenJson.access_token == "") {
//         res.status(401).json({ message: "Access code not found." })
//         return;
//     }

//     const openidRes = await fetch("http://gitlab.com/oauth/userinfo", {
//         headers: {
//             'Authorization': `Bearer ${tokenJson.access_token}`
//         }
//     })
//     const openidJson = await openidRes.json();

//     let cohorts: string[] = [];
//     for (const group of openidJson.groups as string[]) {
//         if (group.startsWith('tecky.io/hk-map')) {
//             const component = group.split('/');
//             cohorts.push(component[1]);
//         }
//     }

//     if (cohorts.length == 0) {
//         res.status(401).json({ message: "Not a tecky student." })
//         return;
//     }
// }
