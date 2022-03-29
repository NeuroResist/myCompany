// Названия компаний
const ORDERNAMES = [
    "Реферат",
    "К/Р",
    "Проект",
    "Диплом",
    "Сайт",
    "Уборка дома",
    "Выгул кота",
    "Тест сайта",
    "Создание музыки",
    "Конспект",
]
// Имена сотрудников
const WORKERNAMES = [
    "Петя",
    "Ваня",
    "Коля",
    "Рома",
    "Саша",
    "Маша",
    "Котя",
    "Лёня",
    "Лёля",
    "Олег",
    "Ярик",
]


// Модалка
let modal = document.querySelector("#myModal");
let btn = document.querySelector(".myBtn");
let span = document.querySelector(".close");
// Когда пользователь нажимает на кнопку, открыть модалку
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



const render = (obj, whatIsIt, innerTo, hire) => {
    // Распределить по переменным данные из переданного объекта
    const idText = obj.getId();
    const nameText = obj.getName();
    const moneyText = obj.getMoney();
    let ratingText;
    let daysText;
    if (whatIsIt === "notHiredWorker" || whatIsIt === "notTakenOrder") {
        daysText = obj.getTimeToDelete();
    } else if (whatIsIt === "takenOrder") {
        daysText = obj.getTimeToDo();
    } else {
        daysText = obj.getDaysInCompany();
    }
    if (whatIsIt === "hiredWorker" || whatIsIt === "notHiredWorker") {
        ratingText = obj.getEfficiency();
    } else {
        ratingText = obj.getRating();
    }

    // Создать элементы HTML
    const element = document.createElement('li');           // Создание блока для контента
    const id = document.createElement('div');               // Создание блока для Id
    const name = document.createElement('div');             // Создание блока для Имени
    const money = document.createElement('div');            // Создание блока для Денег
    const rating = document.createElement('div');           // Создание блока для Рейтинга
    const days = document.createElement('div');             // Создание блока для Дней до удаления
    const button = document.createElement('button');        // Кнопки


    // Действия по нажатию кнопки
    button.onclick = () => {
        button.parentElement.parentElement.childNodes.forEach((elem, i) => {
            console.log(i, elem.firstChild.textContent)
            if (+elem.firstChild.textContent === obj.getId()) {
                if (whatIsIt === "notHiredWorker") {
                    a.hireToMyCompany(i);
                    document.querySelector(".my-workers").innerHTML = "";
                    for (let i = 0; i < a.myCompany.getWorkers().length; i++) {
                        render(a.myCompany.getWorkers(i), "hiredWorker", document.querySelector(".my-workers"))
                    }
                } else if (whatIsIt === "hiredWorker") {
                    a.fireWorker(i)
                } else if (whatIsIt === "notTakenOrder") {
                    a.takeOrderToMyCompany(i)
                    document.querySelector(".my-orders").innerHTML = "";
                    for (let i = 0; i < a.myCompany.getOrder().length; i++) {
                        render(a.myCompany.getOrder(i), "takenOrder", document.querySelector(".my-orders"))
                    }
                } else if ("takenOrder"){
                    a.rejectOrder(i);
                    a.myCompany.setRating(-ratingText*10);
                }
                button.parentElement.parentElement.removeChild(button.parentElement);
            }
        })
    }


    // Дать элементам классы
    element.classList.add("main-block-with-content__element", "worker-info-tile");
    id.classList.add("tile", "worker-info-tile__id");
    name.classList.add("tile", "worker-info-tile__name");
    money.classList.add("tile", "worker-info-tile__money");
    rating.classList.add("tile", "worker-info-tile__rating");
    days.classList.add("tile", "worker-info-tile__days-to-delete");
    button.classList.add("order-info-tile__button");
    button.innerText = "✚"

    // Вставить в блоки значения
    id.innerText = idText;
    name.innerText = nameText;
    money.innerText = moneyText;
    rating.innerText = ratingText;
    days.innerText = daysText;

    // Складываем все элементы в общий блок
    element.appendChild(id)
    element.appendChild(name)
    element.appendChild(money)
    element.appendChild(rating)
    element.appendChild(days)
    element.appendChild(button)
    if(whatIsIt === "hiredWorker" || whatIsIt === "takenOrder"){
        button.innerText = "✘"
    }

    // Вставляем элемент в переданное в функцию место
    innerTo.appendChild(element);
}


// Все конструкторы
// IT компания
function Company() {
    let money = Math.floor(Math.random() * 100 + 50);      // Количество денег, целочисленное от 50 до 150
    let rating = Math.floor(Math.random() * 50) / 100 + 0.5;// Рейтинг компании от 0.5 до 1
    let workers = [];                                       // Список сотрудников, приходят из другого класса
    let orderList = [];                                // Список заказов, приходят из другого класса

    // GETTERS и SETTERS
    this.getRating = () => {                             // Взять значение Рейтинга
        return rating;
    }
    this.getMoney = () => {                              // Взять значение Денег
        return money;
    }
    this.setRating = (changeRating) => {                   // Установить новое значение Рейтинга
        rating += changeRating;
    }
    this.setMoney = (changeMoney) => {                     // Установить новое значение Денег
        money += changeMoney;
    }
    this.hireWorker = (worker) => {                      // Нанять сотрудника
        workers.push(worker);
    }
    this.getWorkers = (id) => {                          // Взять список сотрудников
        return (typeof id === "number") ? workers[id] : workers;
    }
    this.dismiss = function (id) {                      // Уволить сотрудника
        workers.splice(id, 1);
    };
    this.refuseOrder = function (id) {                   // Отказаться от заказа
        orderList.splice(id, 1);
    };
    this.setOrder = function (order) {                  // Взять себе заказ
        orderList.push(order);
    };
    this.getOrder = function (id) {                     // Взять список заказов
        return (typeof id === "number") ? orderList[id] : orderList;
    };


    const isEfficiencyMoreThenMoney = () => {
        let bool;
        const sumOfEfficiency = () => {
            let efficiency = 0;
            for (let i in workers) {
                efficiency += workers[i].getEfficiency();
            }
            console.log(efficiency)
            return efficiency;
        }
        const sumOfMoney = () => {
            let money = 0;
            for (let i in orderList) {
                money += orderList[i].getMoney();
            }
            return money;
        }

        if ((sumOfMoney() - sumOfEfficiency()) < 0) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }


    const hiredWorkersNextDay = () => {
        let hiredWorkers = workers;
        console.log(hiredWorkers.length)
        for (let item in hiredWorkers) {
            hiredWorkers[item].plusDaysInCompany();
            // console.log(hiredWorkers[item]);
            if (hiredWorkers[item].getDaysInCompany() % 30 === 0) {
                this.setMoney((hiredWorkers[item].getMoney()) * -1);
            }
        }
    }
    const takenOrdersNextDay = () => {
        let takenOrders = orderList;
        for (let item in takenOrders) {
            // console.log(takenOrders[item]);
            if (isEfficiencyMoreThenMoney()) {
                takenOrders[item].timeToDoMinusOneDay();
            }
            if (takenOrders[item].getTimeToDo() === 0) {
                this.setRating(takenOrders[item].getRating());
                this.setMoney(takenOrders[item].getMoney());
                takenOrders.splice(+item, 1)
            }
        }
    }

    // Функция для обновления 1 дня
    this.nextDayCompany = function () {
        hiredWorkersNextDay()
        takenOrdersNextDay()
    }
}

// Интерфейс для myCompany
// getRating() setRating() - Взять Установить Рейтинг
// getMoney() setMoney() - Взять Установить значение Денег
// setOrder() getOrder() - Взять Показать Заказ
// hireWorker() getWorkers() - Взять Показать Сотрудников
// dismiss() - Уволить Сотрудника
// nextDayCompany() - Следующий день в Компании

// Генератор Заказов
function Order(newId, myCompanyRating) {
    let id = newId;                                          // Id
    let money = Math.floor((Math.random() * 4 + 1) * myCompanyRating);// Количество денег на задачу, целочисленное от 1 до 10 (* на эффективность компании)
    const name = ORDERNAMES[Math.floor(Math.random() * 9 + 1)];  // Название Заказа
    let timeToDo = Math.floor(Math.random() * 5 + 5);            // Количество дней на выполнение задачи от 1 до 5
    const rating = Math.floor((Math.random() * 5) * myCompanyRating) / 100;// Рейтинг Заказа от 0 до 0.1
    let timeToDelete = Math.floor(Math.random() * 5 + 5);        // Количество пока заказ не удалится от 1 до 5


    this.getMoney = () => {                                   // Взять значение Денег
        return money;
    }
    this.getName = () => {                                     // Взять Имя
        return name;
    }
    this.getId = () => {                                       // Взять Id
        return id;
    }
    this.getRating = () => {                                   // Взять Рейтинг
        return rating;
    }
    this.getTimeToDo = () => {                                 // Взять Время для выполнения
        return timeToDo;
    }
    this.getTimeToDelete = () => {                             // Взять Время до удаления заказа
        return timeToDelete;
    }
    this.timeToDoMinusOneDay = () => {                         // Минус один день до выполнения заказа
        timeToDo--;
    }
    this.timeToDeleteMinusOneDay = () => {                     // Минус один день до удаления заказа
        timeToDelete--;
    }

// Интерфейс для Order
// getMoney() - Взять значение Денег
// getName() - Взять Название заказа
// getId() - Взять Id
// getRating() - Взять Рейтинг
// getTimeToDo() getTimeToDelete() - Взять Время до Выполнения / Удаления заказа
// timeToDoMinusOneDay() timeToDeleteMinusOneDay() - Минус один день
}


// Генератор Сотрудников
function Workers(newId, myCompanyRating) {
    let id = newId;                                            // Id
    const money = Math.floor((Math.random() * 5 + 5) * myCompanyRating);// Количество ЗП, целочисленное от 5 до 20 (* на эффективность компании)
    const name = WORKERNAMES[Math.floor(Math.random() * 9 + 1)];   // Название компании
    // Эффективность работника от 0.25 до 3 (* на эффективность компании)
    const efficiency = Math.floor(((Math.random() + 0.5) * myCompanyRating) * 100) / 100;
    let timeToDelete = Math.floor(Math.random() * 5 + 5);          // Количество дней на выполнение задачи от 1 до 5
    let daysInCompany = 0;                                     // Количество дней в команде

    this.getMoney = () => {                                     // Взять значение Зарплаты
        return money;
    }
    this.getName = () => {                                       // Взять Имя сотрудника
        return name;
    }
    this.getId = () => {                                         // Взять Id
        return id;
    }
    this.getEfficiency = () => {                                 // Взять Эффективность
        return efficiency;
    }
    this.getTimeToDelete = () => {                               // Взять Время до удаления Сотрудника
        return timeToDelete;
    }
    this.timeToDeleteMinusOneDay = () => {                       // Минус один день до удаления Сотрудника
        timeToDelete--;
    }
    this.getDaysInCompany = () => {                              // Взять Время работы Сотрудника в компании
        return daysInCompany;
    }
    this.plusDaysInCompany = () => {                             // Плюс 1 день работы Сотрудника в компании
        daysInCompany++;
    }

// Интерфейс для Order
// getMoney() - Взять значение Зарплаты
// getName() - Взять Имя сотрудника
// getEfficiency() - Взять Эффективность
// daysInCompany() - Время работы в компании
// getId() - Взять Id
// newDaysInCompany() - Новый +1 день в компании
// plusDaysInCompany() - Плюс 1 день работы Сотрудника в компании
// getTimeToDelete() - Взять время до Удаления Сотрудника
// timeToDeleteMinusOneDay() - Минус один день
}

// Функция для генерации массивов с объектами


// Создание Игры
function Game() {
    this.countOfWorkers = 0;
    this.countOfOrders = 0;
    this.days = 0;
    this.myCompany = new Company();                     // Создаем 1 компанию

    const createSomething = (func, iterator, id, rating, name) => {
        let list = [];
        for (let i = 0; i < iterator; i++) {
            if (name === "worker") {
                this.countOfWorkers++;
                const newWorker = new func(this.countOfWorkers, rating);
                list.push(newWorker);
                render(newWorker, "notHiredWorker", document.querySelector(".not-hired-workers"), this)
            } else if (name === "order") {
                this.countOfOrders++;
                const newOrder = new func(this.countOfOrders, rating)
                list.push(newOrder);
                render(newOrder, "notTakenOrder", document.querySelector(".not-taken-order"), this)
            }
        }
        return list;
    }

    this.workers = createSomething(Workers, 10, this.countOfWorkers, this.myCompany.getRating(), "worker"); // Создаем 10 работников для найма
    this.orders = createSomething(Order, 10, this.countOfOrders, this.myCompany.getRating(), "order");     // Создаем 10 заказов для их взятия

    // Методы
    // Запись в localStorage
    this.toLocalStorage = () => {
        localStorage.setItem("game", JSON.stringify(this));
    }
    this.fireWorker = (id) => {                           // Уволить сотрудника, отсылает в функцию в myCompany
        this.myCompany.dismiss(id);
    }
    this.rejectOrder = (id)=>{
        this.myCompany.refuseOrder(id)
    }


    this.aboutGame = () => {
        const everyWorker = (workers, str) => {
            const myWorkers = workers;
            let allWorkers = "\n";
            myWorkers.forEach((worker) => {
                if (str === "hired") {
                    allWorkers += `Id: ${worker.getId()}, ЗП: ${worker.getMoney()}, Эффективность: ${worker.getEfficiency()}, Дней в компании: ${worker.getDaysInCompany()} \n`;
                } else
                    allWorkers += `Id: ${worker.getId()}, ЗП: ${worker.getMoney()}, Эффективность: ${worker.getEfficiency()}, Дней до удаления: ${worker.getTimeToDelete()} \n`;
            })
            return allWorkers;
        }
        const everyOrder = (orders, str) => {
            const myOrders = orders;
            let allOrders = "\n";
            myOrders.forEach((order) => {
                if (str === "taken") {
                    allOrders += `Id: ${order.getId()}, Деньги: ${order.getMoney()}, Рейтинг: ${order.getRating()}, Время до выполнения: ${order.getTimeToDo()} \n`;
                } else
                    allOrders += `Id: ${order.getId()}, Деньги: ${order.getMoney()}, Рейтинг: ${order.getRating()}, Время до удаления: ${order.getTimeToDelete()} \n`;
            })
            return allOrders;
        }

        console.log(`\n Прошло дней: ${this.days},
         Нанято сотрудников: ${this.myCompany.getWorkers().length},
         Информация по каждому НАНЯТОМУ сотруднику:
          ${everyWorker(this.myCompany.getWorkers(), "hired")}        
          Информация по каждому ВЗЯТОМУ заказу:
          ${everyOrder(this.myCompany.getOrder(), "taken")}
         Информация по каждому НЕ! НАНЯТОМУ сотруднику:
          ${everyWorker(this.workers)}        
          Информация по каждому НЕ! ВЗЯТОМУ заказу:
          ${everyOrder(this.orders)}
         Рейтинг компании: ${this.myCompany.getRating()},
         Взято заказов: ${this.myCompany.getOrder().length},
         денег у компании: ${this.myCompany.getMoney()},`)
    }


    // Положить сотрудника в компанию и удалить из списка свободных сотрудников
    this.hireToMyCompany = function (id) {
        // Сюда передавать HTML ноду, из которой надо найти Id отрисованного объекта
        const workerWithId = {};
        this.myCompany.hireWorker(this.workers[id]);
        this.workers.splice(id, 1);
        this.countOfWorkers++;
        console.log(new Workers(this.countOfWorkers, this.myCompany.getRating()).getId())
        this.workers.push(new Workers(this.countOfWorkers, this.myCompany.getRating())); // Сразу добавить сотрудника
    };
    // Положить заказ в компанию и удалить из списка свободных заказов
    this.takeOrderToMyCompany = function (id) {
        // Сюда передавать HTML ноду, из которой надо найти Id отрисованного объекта
        const orderWithId = {};
        this.myCompany.setOrder(this.orders[id]);
        this.orders.splice(id, 1);
        this.countOfOrders++;
        //Order, 10, this.countOfOrders,  this.myCompany.getRating(), "order"
        this.orders.push(new Order(this.countOfOrders, this.myCompany.getRating()));     // Сразу заменить взятый заказ на новый
    };


    // Методы для НЕ нанятых и НЕ взятых
    const nextDayForWorkersAndOrders = () => {
        const notHiredWorkersNextDay = () => {
            let notHiredWorkers = this.workers;
            for (let item in notHiredWorkers) {
                notHiredWorkers[item].timeToDeleteMinusOneDay();
                if (notHiredWorkers[item].getTimeToDelete() === 0) {
                    notHiredWorkers.splice(+item, 1);
                    this.countOfWorkers++;
                    notHiredWorkers.push(new Workers(this.countOfWorkers, this.myCompany.getRating()));
                }
            }
        }
        const notTakenOrdersNextDay = () => {
            let notTakenOrders = this.orders;
            for (let item in notTakenOrders) {
                notTakenOrders[item].timeToDeleteMinusOneDay();
                if (notTakenOrders[item].getTimeToDelete() === 0) {
                    notTakenOrders.splice(+item, 1);
                    this.countOfOrders++;
                    notTakenOrders.push(new Order(this.countOfOrders, this.myCompany.getRating()));
                }
            }
        }
        notHiredWorkersNextDay()
        notTakenOrdersNextDay()
    }


    const newDayRender = () => {
        document.querySelector(".not-hired-workers").innerHTML = "";
        document.querySelector(".not-taken-order").innerHTML = "";
        document.querySelector(".my-orders").innerHTML = "";
        document.querySelector(".my-workers").innerHTML = "";
        for (let i = 0; i < this.workers.length; i++)
            render(this.workers[i], "notHiredWorker", document.querySelector(".not-hired-workers"))
        for (let i = 0; i < this.orders.length; i++)
            render(this.orders[i], "notTakenOrder", document.querySelector(".not-taken-order"))
        for (let i = 0; i < this.myCompany.getWorkers().length; i++)
            render(this.myCompany.getWorkers(i), "hiredWorker", document.querySelector(".my-workers"))
        for (let i = 0; i < this.myCompany.getOrder().length; i++)
            render(this.myCompany.getOrder(i), "takenOrder", document.querySelector(".my-orders"))
    }

    // Следующий день
    this.nextDay = () => {
        this.days++;
        this.myCompany.nextDayCompany() // Вызвать следующий день внутри компании
        nextDayForWorkersAndOrders();
        newDayRender();
        this.aboutGame();
        // Выставление значений в Header
        document.querySelector(".rating").innerText = "Rating: " + this.myCompany.getRating().toFixed(2);
        document.querySelector(".money").innerText = "Money: " + this.myCompany.getMoney();
        document.querySelector(".day").innerText = "Day: " + this.days;
    }


// Кнопка Next Day в Header
    document.querySelector(".header-buttons").onclick = () => {
        if(this.myCompany.getRating() >=2){
            alert("Рейтинг >= 2, Вы победили")
        } else if (this.myCompany.getRating() <=0) {
            alert("Рейтинг <= 0, Игра окончена")
        } else if (this.myCompany.getMoney() <= 0) {
            alert("Денег <= 0, Игра окончена")
        } else {
            this.nextDay();
        }
    };

}

let a = new Game();
a.toLocalStorage();

a.hireToMyCompany(5);
a.hireToMyCompany(6);
a.takeOrderToMyCompany(5);
a.takeOrderToMyCompany(6);
a.nextDay()
a.nextDay()
