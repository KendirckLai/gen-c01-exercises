

let selectedRegion = "nw"


function switchboard() {
    const radiocheckbox = document.querySelectorAll(".form-check-input");// id cant be repeated +addevent ,#=id ,.=class 
    console.log(radiocheckbox);
    for (let options of radiocheckbox) {
        options.addEventListener("change", function (event) {
            if (event.target.value == "hki") {
                selectedRegion = "hki"
                hki.disabled = false
                kw.disabled = true;
                nw.disabled = true;
            } else if (event.target.value == "kw") {
                selectedRegion = "kw"
                kw.disabled = false
                hki.disabled = true;
                nw.disabled = true;
            } else if (event.target.value == "nw") {
                selectedRegion = "nw"
                kw.disabled = true
                hki.disabled = true;
                nw.disabled = false;
            }
        })
    }
}





async function main() {
    const productCreateForm = document.querySelector('#create-shop-form');

    switchboard()
    productCreateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formObject = {};
        for (const input of productCreateForm) {
            if (!['submit'].includes(input.type)) {
                formObject[input.name] = input.value;
            }
        }
        // console.log(formObject);
        // console.log(selectedRegion);
        // let areas;
        // if (selectedRegion === "nw") {
        //     areas = formObject.nw_areas;
        // }
        console.log(JSON.stringify({
            shopNameChinese: formObject.shopNameChinese,
            shopNameEnglish: formObject.shopNameEnglish,
            // Region: selectedRegion,
            areas: formObject[`${selectedRegion}_areas`],
            categories: formObject.categories,
        }))
        const res = await fetch('/api/v1/shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // bodyParser.json()
            },
            body: JSON.stringify({
                shopNameChinese: formObject.shopNameChinese,
                shopNameEnglish: formObject.shopNameEnglish,
                // Region: selectedRegion,
                area_id: formObject[`${selectedRegion}_areas`],
                category_id: formObject.categories,
            }),
        });
        if (res.status !== 200) {
            // error
            console.log('error');
        } else {
            const pid = (await res.json()).product_id;
            console.log(pid);
            productCreateForm.reset();
        }
    });

}
window.onload = () => {
    main();
};


