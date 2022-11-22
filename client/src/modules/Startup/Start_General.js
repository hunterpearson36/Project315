import { sendQuery } from "../Query";

function home() {
    const getEntrees = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 100 and structure_id < 200 order by structure_id;")
            .then((response) => {
                //console.log("received response");
                window.entrees = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    // sides
    const getSides = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 200 and structure_id < 300 order by structure_id;")
            .then((response) => {
                //console.log("received response");
                window.sides = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    // desserts
    const getDesserts = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 300 and structure_id < 400 order by structure_id;")
            .then((response) => {
                //console.log("received response");
                window.desserts = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    // drinks
    const getDrinks = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 400 and structure_id < 500 order by structure_id;")
            .then((response) => {
                //console.log("received response");
                window.drinks = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const getOrder = async () => {
        await sendQuery("SELECT * from orders order by order_id;")
            .then((response) => {
                //console.log("received response");
                window.orderL = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const getItems = async () => {
        await sendQuery("SELECT * from items order by item_id;")
            .then((response) => {
                //console.log("received response");
                window.itemList = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const getIngred = async () => {
        await sendQuery("SELECT * from ingredients order by ingred_id;")
            .then((response) => {
                //console.log("received response");
                window.ingredList = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    getEntrees();
    getSides();
    getDesserts();
    getDrinks();
    getOrder();
    getItems();
    getIngred();
}

function loadGeneral() {
    home();
}

export { loadGeneral };