import { sendQuery } from "../Query";

function manager() {
    const getIngred = async () => {
        await sendQuery("SELECT * from ingredients where ingred_id < 2000 order by ingred_id;")
            .then((response) => {
                //console.log("received response");
                window.ingred = response;
            }).catch((error) => {
                console.error(error.message);
            })
    }

    const getItems = async () => {
        await sendQuery("SELECT * from item_structures order by structure_id;")
            .then((response) => {
                //console.log("received response");
                window.itm = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const getRestock = async () => {
        await sendQuery("SELECT * from restock order by restock_id;")
            .then((response) => {
                //console.log("received response");
                window.restock = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    getIngred();
    getItems();
    getRestock();
}

function reports() {
    const getOrders = async () => {
        await sendQuery("SELECT * from orders order by order_date;")
            .then((response) => {
                //console.log("received response");
                window.orderSales = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    const getItems = async () => {
        await sendQuery("SELECT * from items order by item_id;")
            .then((response) => {
                //console.log("received response");
                window.itemSales = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }
    const getIngred = async () => {
        await sendQuery("SELECT * from ingredients order by ingred_id;")
            .then((response) => {
                //console.log("received response");
                window.ingredSales = response;
            }).catch((error) => {
                console.error(error.message);
            });
    }

    getOrders();
    getItems();
    getIngred();
}

function loadManager() {
    manager();
    reports();
}

export { loadManager };