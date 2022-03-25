// Названия компаний
const ORDERNAMES = [
    "Целковый",
    "Полушка",
    "Четвертушка",
    "Осьмушка",
    "Пудовичок",
    "Медячок",
    "Серебрячок",
    "Золотничок",
    "Девятичок",
    "Десятичок",
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
// Все конструкторы
// IT компания
function Company() {
    this.money = Math.floor(Math.random()*100+50);  // Количество денег, целочисленное от 50 до 150
    this.rating =  Math.floor(Math.random()*100)/100; // Рейтинг компании от 0 до 1
    this.workers = [];                              // Список сотрудников, приходят из другого класса
    this.orderList = [];                            // Список заказов, приходят из другого класса

    this.dismiss = function(id) {                   // Уволить сотрудника
        this.workers.splice(id,1);
    };

    const hiredWorkersNextDay = ()=>{
        let hiredWorkers = this.workers;
        for(let item in hiredWorkers){
            hiredWorkers[item].daysInCompany++;
            console.log(hiredWorkers[item]);
            if (hiredWorkers[item].daysInCompany%30===0){
                this.money-=hiredWorkers[item].money;
            }
        }
    }
    const takenOrdersNextDay = ()=> {
        let takenOrders = this.orderList;
        for(let item in takenOrders){
            takenOrders[item].timeToDo--;
            console.log(takenOrders[item]);
            if(takenOrders[item].timeToDo===0){
                this.money+=takenOrders[item].money;
                takenOrders.splice(+item,1)
            }
        }
    }
    // Функция для обновления 1 дня
    this.nextDayCompany = function(){
        hiredWorkersNextDay()
        takenOrdersNextDay()
    }
}

// Генератор Заказов
function Order() {
    this.money = Math.floor(Math.random()*9+1);             // Количество денег на задачу, целочисленное от 1 до 10
    this.name = ORDERNAMES[Math.floor(Math.random()*9+1)];  // Название Заказа
    this.timeToDo = Math.floor(Math.random()*5+5);          // Количество дней на выполнение задачи от 1 до 5
    this.rating = Math.floor(Math.random()*100)/100;        // Рейтинг Заказа от 0 до 1
    this.timeToDelete = Math.floor(Math.random()*5+5);      // Количество пока заказ не удалится от 1 до 5
}

// Генератор Сотрудников
function Workers() {
    this.money = Math.floor(Math.random()*5+5);             // Количество денег, целочисленное от 1 до 5
    this.name = WORKERNAMES[Math.floor(Math.random()*9+1)]; // Название компании
    this.efficiency = Math.floor((Math.random()+0.5)*100)/100; // Эффективность работника от 0.5 до 1.5
    this.timeToDelete = Math.floor(Math.random()*5+5);      // Количество дней на выполнение задачи от 1 до 5
    this.daysInCompany = 0;                                 // Количество дней в команде
}

// Функция для генерации массивов с объектами
const createSomething = (func, iterator)=>{
    let list = [];
    for(let i=0;i<iterator;i++){
        list.push(new func())
    }
    return list;
}

// Создание Игры
function Game(){
    this.myCompany = new Company();                     // Создаем 1 компанию
    this.workers = createSomething(Workers, 10);        // Создаем 10 работников для найма
    this.orders = createSomething(Order, 10);           // Создаем 10 заказов для их взятия
    this.days = 0;
    // Методы

    // Запись в localStorage
    this.toLocalStorage = ()=>{
        localStorage.setItem("game", JSON.stringify(this));
    }

    this.aboutGame = ()=>{
        console.log(`\n Прошло дней: ${this.days},\n
         Нанято сотрудников: ${this.myCompany.workers.length},\n
         Взято заказов: ${this.myCompany.orderList.length},\n
         денег у компании: ${this.myCompany.money},\n`)
    }

    // Перекидывание работника в Компанию
    this.hiredWorker = (worker)=>{
        this.myCompany.workers.push(worker);
    }
    // Перекидывание заказа в Компанию
    this.takeOrderToCompany = (order)=>{
        this.myCompany.orderList.push(order);
    }

    // Положить сотрудника в компанию и удалить из списка свободных сотрудников
    this.hire = function(id) {
        this.hiredWorker(this.workers[id]);
        this.workers.splice(id,1);
        this.workers.push(new Workers()); // Сразу добавить сотрудника
    };

    // Положить заказ в компанию и удалить из списка свободных заказов
    this.takeOrder = function(id) {
        this.takeOrderToCompany(this.orders[id]);
        this.orders.splice(id,1);
        this.orders.push(new Order())    // Сразу заменить взятый заказ на новый
    };

    // Методы для НЕ нанятых и НЕ взятых
    const nextDayForWorkersAndOrders = ()=>{
        const notHiredWorkersNextDay = ()=>{
            let notHiredWorkers = this.workers;
            for(let item in notHiredWorkers){
                notHiredWorkers[item].timeToDelete--;
                if(notHiredWorkers[item].timeToDelete===0){
                    notHiredWorkers.splice(+item,1);
                }
            }
        }
        const notTakenOrdersNextDay = ()=>{
            let notTakenOrders = this.orders;
            for(let item in notTakenOrders){
                notTakenOrders[item].timeToDelete--;
                if(notTakenOrders[item].timeToDelete===0){
                    notTakenOrders.splice(+item,1);
                }
            }
        }
        notHiredWorkersNextDay()
        notTakenOrdersNextDay()
    }




    // Следующий день
    this.nextDay =()=>{
        this.days++;
        this.myCompany.nextDayCompany() // Вызвать следующий день внутри компании
        nextDayForWorkersAndOrders();
    }
}

let a = new Game();
a.toLocalStorage();

a.hire(5);
a.hire(6);
a.takeOrder(5);
a.takeOrder(6);
a.nextDay()
console.log(a);
a.nextDay()
console.log(a);

