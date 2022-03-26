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
    let money = Math.floor(Math.random()*100+50);  // Количество денег, целочисленное от 50 до 150
    let rating =  Math.floor(Math.random()*50)/100+0.5;// Рейтинг компании от 0.5 до 1
    let workers = [];                              // Список сотрудников, приходят из другого класса
    let orderList = [];                            // Список заказов, приходят из другого класса

    // GETTERS и SETTERS
    this.getRating = ()=>{                          // Взять значение Рейтинга
        return rating;
    }
    this.getMoney = ()=>{                           // Взять значение Денег
        return money;
    }
    this.setRating=(changeRating)=>{                // Установить новое значение Рейтинга
        rating+=changeRating;
    }
    this.setMoney=(changeMoney)=>{                  // Установить новое значение Денег
        money+=changeMoney;
    }
    this.hireWorker = (worker)=>{                   // Нанять сотрудника
        workers.push(worker);
    }
    this.getWorkers = (id)=>{                       // Взять список сотрудников
        return id?workers[id]:workers;
    }
    this.dismiss = function(id) {                   // Уволить сотрудника
        workers.splice(id,1);
    };
    this.setOrder = function(order) {               // Взять себе заказ
        orderList.push(order);
    };
    this.getOrder = function(id) {                  // Взять список заказов
        return id?orderList[id]:orderList;
    };

    const hiredWorkersNextDay = ()=>{
        let hiredWorkers = workers;
        for(let item in hiredWorkers){
            hiredWorkers[item].plusDaysInCompany();
            console.log(hiredWorkers[item]);
            if (hiredWorkers[item].getDaysInCompany()%30===0){
                this.setMoney(hiredWorkers[item].getMoney());
            }
        }
    }
    const takenOrdersNextDay = ()=> {
        let takenOrders = orderList;
        for(let item in takenOrders){
            console.log(takenOrders[item]);

            takenOrders[item].timeToDoMinusOneDay();
            if(takenOrders[item].getTimeToDo()===0){
                this.setMoney(takenOrders[item].getMoney());
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

// Интерфейс для myCompany
// getRating() setRating() - Взять Установить Рейтинг
// getMoney() setMoney() - Взять Установить значение Денег
// setOrder() getOrder() - Взять Показать Заказ
// hireWorker() getWorkers() - Взять Показать Сотрудников
// dismiss() - Уволить Сотрудника
// nextDayCompany() - Следующий день в Компании

// Генератор Заказов
function Order() {
    let money = Math.floor(Math.random()*9+1);             // Количество денег на задачу, целочисленное от 1 до 10
    const name = ORDERNAMES[Math.floor(Math.random()*9+1)];  // Название Заказа
    let timeToDo = Math.floor(Math.random()*5+5);          // Количество дней на выполнение задачи от 1 до 5
    const rating = Math.floor(Math.random()*100)/100;        // Рейтинг Заказа от 0 до 1
    let timeToDelete = Math.floor(Math.random()*5+5);      // Количество пока заказ не удалится от 1 до 5


    this.getMoney = () =>{                                   // Взять значение Денег
        return money;
    }
    this.getName = ()=>{                                     // Взять Имя
        return name;
    }
    this.getRating = ()=>{                                   // Взять Рейтинг
        return name;
    }
    this.getTimeToDo = ()=>{                                 // Взять Время для выполнения
        return timeToDo;
    }
    this.getTimeToDelete = ()=>{                             // Взять Время до удаления заказа
        return timeToDelete;
    }
    this.timeToDoMinusOneDay = ()=>{                         // Минус один день до выполнения заказа
        timeToDo--;
    }
    this.timeToDeleteMinusOneDay = ()=>{                     // Минус один день до удаления заказа
        timeToDelete--;
    }

// Интерфейс для Order
// getMoney() - Взять значение Денег
// getName() - Взять Название заказа
// getRating() - Взять Рейтинг
// getTimeToDo() getTimeToDelete() - Взять Время до Выполнения / Удаления заказа
// timeToDoMinusOneDay() timeToDeleteMinusOneDay() - Минус один день
}


// Генератор Сотрудников
function Workers() {
    const money = Math.floor(Math.random()*5+5);               // Количество денег, целочисленное от 1 до 5
    const name = WORKERNAMES[Math.floor(Math.random()*9+1)];   // Название компании
    const efficiency = Math.floor((Math.random()+0.5)*100)/100;// Эффективность работника от 0.5 до 1.5
    let timeToDelete = Math.floor(Math.random()*5+5);          // Количество дней на выполнение задачи от 1 до 5
    let daysInCompany = 0;                                     // Количество дней в команде

    this.getMoney = () =>{                                     // Взять значение Зарплаты
        return money;
    }
    this.getName = ()=>{                                       // Взять Имя сотрудника
        return name;
    }
    this.getEfficiency = ()=>{                                 // Взять Эффективность
        return efficiency;
    }
    this.getTimeToDelete = ()=>{                               // Взять Время до удаления Сотрудника
        return timeToDelete;
    }
    this.timeToDeleteMinusOneDay = ()=>{                       // Минус один день до удаления Сотрудника
        timeToDelete--;
    }
    this.getDaysInCompany = ()=>{                              // Взять Время работы Сотрудника в компании
        return daysInCompany;
    }
    this.plusDaysInCompany = ()=>{                             // Плюс 1 день работы Сотрудника в компании
        daysInCompany++;
    }
    this.newDaysInCompany = ()=>{                              // Взять Время работы Сотрудника в компании
        return daysInCompany;
    }

// Интерфейс для Order
// getMoney() - Взять значение Зарплаты
// getName() - Взять Имя сотрудника
// getEfficiency() - Взять Эффективность
// daysInCompany() - Время работы в компании
// newDaysInCompany() - Новый +1 день в компании
// plusDaysInCompany() - Плюс 1 день работы Сотрудника в компании
// getTimeToDelete() - Взять время до Удаления Сотрудника
// timeToDeleteMinusOneDay() - Минус один день
}

// Функция для генерации массивов с объектами
const createSomething = (func, iterator)=>{
    let list = [];
    for(let i=0;i<iterator;i++){
        list.push(new func());
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
    this.fireWorker = (id)=>{                           // Уволить сотрудника, отсылает в функцию в myCompany
        this.myCompany.dismiss(id);
    }
    this.aboutGame = ()=>{
        console.log(`\n Прошло дней: ${this.days},\n
         Нанято сотрудников: ${this.myCompany.getWorkers().length},\n
         Взято заказов: ${this.myCompany.getOrder().length},\n
         денег у компании: ${this.myCompany.getMoney()},\n`)
    }




    // Положить сотрудника в компанию и удалить из списка свободных сотрудников
    this.hireToMyCompany = function(id) {
        this.myCompany.hireWorker(this.workers[id]);
        this.workers.splice(id,1);
        this.workers.push(new Workers()); // Сразу добавить сотрудника
    };
    // Положить заказ в компанию и удалить из списка свободных заказов
    this.takeOrderToMyCompany = function(id) {
        this.myCompany.setOrder(this.orders[id]);
        this.orders.splice(id,1);
        this.orders.push(new Order())    // Сразу заменить взятый заказ на новый
    };





    // Методы для НЕ нанятых и НЕ взятых
    const nextDayForWorkersAndOrders = ()=>{
        const notHiredWorkersNextDay = ()=>{
            let notHiredWorkers = this.workers;
            for(let item in notHiredWorkers){
                notHiredWorkers[item].timeToDeleteMinusOneDay();
                if(notHiredWorkers[item].getTimeToDelete()===0){
                    notHiredWorkers.splice(+item,1);
                }
            }
        }
        const notTakenOrdersNextDay = ()=>{
            let notTakenOrders = this.orders;
            for(let item in notTakenOrders){
                notTakenOrders[item].timeToDeleteMinusOneDay();
                if(notTakenOrders[item].getTimeToDelete()===0){
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

a.hireToMyCompany(5);
a.hireToMyCompany(6);
a.takeOrderToMyCompany(5);
a.takeOrderToMyCompany(6);
a.nextDay()
console.log(a);
a.nextDay()
console.log(a);

