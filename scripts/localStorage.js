// Работники, Заказы, дни хранятся в localStorage


if(!localStorage.getItem("orders")){
    localStorage.setItem("orders",  JSON.stringify([]));
}
if(!localStorage.getItem("workers")){
    localStorage.setItem("workers",  JSON.stringify([]));
}
if(!localStorage.getItem("days")){
    localStorage.setItem("days",  JSON.stringify(0));
}

