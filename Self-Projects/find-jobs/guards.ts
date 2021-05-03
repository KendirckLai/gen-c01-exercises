import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = function (req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    if (req.session.user) {
      next();
      return;
    }
  }
  res.redirect('/');
}

export const isLoggedInApi = function (req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    if (req.session.user) {
      next();
      return;
    }
  }
  res.status(401).json({ message: 'Unauthorized' });
}


export const isAdmin = function (req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    if (req.session.user) {
      if (req.session.user.role === "admin") {
        next();
        return;
      }
    }
  }
  res.redirect('/');
}

export const isGraduate = function (req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    if (req.session.user) {
      if (req.session.user.role === "student") {
        next();
        return;
      }
    }
  }
  res.redirect('/');
}


export const isLoggedInApiV2 = (role: string | undefined = undefined) =>
  function (req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      // console.log('test', req.session.user);
      if (req.session.user) {
        console.log(req.session.user, role);
        if (role && req.session.user.role !== role) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }
        next();
        return;
      }
    }
    res.status(401).json({ message: 'Unauthorized' });
  }