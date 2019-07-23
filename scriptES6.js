'use ctrict';
class SmartHome1 {
    constructor(){
        this._deviсes = [];
    }
    onAll(){
        for(let key1 in this._deviсes){
            this._deviсes[key1].on()
        }
    }
    offAll(){
        for(let key2 in this._deviсes){
            this._deviсes[key2].off()
        }
    }
    addDevices(dev){
        this._deviсes.push(dev)
    }
    delDevByID(id){
        delete this._deviсes[id]
    }
    getDevByID(id){
        return this._deviсes[id]
    }
    get deviсes(){
        return this._deviсes
    }
}

class ValidValue{
    static validCurrentTemp(temper, min, max){
        if(temper <= max && temper >= min && typeof temper == 'number'){
            return true;
        }
        return false;
    }
}

class Appliances{
    constructor(brandName){
        this._id = 0;
        this._onOff = false;
        this._brandName = brandName;
    }
    on(){
        this._onOff = true;
    }
    off(){
        this._onOff = false;
    }
    get id(){
        return this._ID;
    }
    set id(id){
        this._ID = id;
    }
    get onOff(){
        return this._onOff
    }
    get brandName(){
        return this._brandName
    }
}


class Conditioner extends Appliances{
    constructor(brandName){
        super(brandName);
        this._currentTemperature = 22;
        this._modeOfConditioner = ['heat', 'cool'];   
        this._currentModeOfConditioner = 0;
        this._fan = ['autoFan', 'low', 'middle', 'hight'];  
        this._currentFan = 0; 
    }
    increaseCurrentTemperature(){
        if(this._currentTemperature == 27){
            this._currentTemperature = 11;
        }
        this._currentTemperature++;
    }
    decreaseCurrentTemperature(){
        if(this._currentTemperature == 12){
            this._currentTemperature = 28;
        }
        this._currentTemperature--;
    }
    get currentTemperature(){
        return this._currentTemperature
    }
    get currentModeOfConditioner(){
        return this._modeOfConditioner[this._currentModeOfConditioner]
    }
    set currentModeOfConditioner(num){
        if(num < this._modeOfConditioner.length && num >= 0 && typeof num == 'number'){
            this._currentModeOfConditioner = num;
        }else{
            this._currentModeOfConditioner = 0;
        }
    }
    get currentFan(){
        return this._fan[this._currentFan]
    }
    nextModeOfFan(){
        if(this._currentFan < this._fan.length - 1){
            this._currentFan++;
        }else{
            this._currentFan = 0;
        }
    }
    previousModeOfFan(){
        if(this._currentFan >= 1){
            this._currentFan--;
        }else{
            this._currentFan = this._fan.length - 1;
        }
    }
}


class Fridge extends Appliances{
    constructor(brandName){
        super(brandName);
        this._currentTemperature = 5;
        this._onOffNoFrost = false;
        this._currentNoFrost = 1;
    }
    get currentTemperature(){
        return this._currentTemperature
    }
    set currentTemperature(number){
        if(ValidValue.validCurrentTemp(number, 5, 15)){
            this._currentTemperature = number;
        }
    }
    onNoFrost(){
        this._onOffNoFrost = true;
    }
    offNoFrost(){
        this._onOffNoFrost = false;
    }
    get onOffNoFrost(){
        return this._onOffNoFrost
    }
    get currentNoFrost(){
        return this._currentNoFrost
    }
    set currentNoFrost(number){
        if(number <= 10 && number >= 1 && typeof number == 'number'){
            this._currentNoFrost = number;
        }
    }
}








class ViewSmartHome {
    constructor(smartHome, container){
        this._smartHome = smartHome;
        this._container = container;
    }

    performance(){

////////////////////////////////////////////////////////////////////////////////////Ввод Инфы
        let containerInputInfo = document.createElement('div');
            let formInfoArea = document.createElement('form');
                formInfoArea.innerText = 'Добавить устройство: ';
                formInfoArea.style.paddingLeft = '10px';

            let inputInfoArea = document.createElement('input');
                inputInfoArea.style.paddingLeft = '5px';
                inputInfoArea.placeholder = 'Введите модель устройства...'

            let selectInfoArea = document.createElement('select');
                selectInfoArea.name = 'selectClass'
                selectInfoArea.id = 'selectID'
                let option1InfoArea = document.createElement('option');
                    option1InfoArea.innerHTML = 'Холодильник';
                    option1InfoArea.value = 'fr';
                let option2InfoArea = document.createElement('option');
                    option2InfoArea.innerHTML = 'Сондиционер';
                    option2InfoArea.value = 'con';

                    

                let inputInfoButton = document.createElement('button');
                    inputInfoButton.type = 'button';
                    inputInfoButton.innerText = 'Добавить устройство';
                    inputInfoButton.addEventListener('click', () => {
        
                        let val = inputInfoArea.value;

                        if(selectInfoArea.value == 'fr'){
                            this._smartHome.addDevices(new Fridge(val))
                            inputInfoArea.value = '';
                        }else if(selectInfoArea.value == 'con'){
                            this._smartHome.addDevices(new Conditioner(val))
                            inputInfoArea.value = '';
                        }

                        let lastElement = this._smartHome.deviсes[this._smartHome.deviсes.length - 1]
                        let setID = () =>{
                            lastElement.id = (this._smartHome.deviсes.length - 1)
                            let ID = lastElement.id;
                            return ID;
                        }
                        if(lastElement.constructor.name == 'Conditioner'){//-------------Отрисовка КОНДИЦИОНЕРА--------------------
                            let itemConditioner = document.createElement('div');
                            itemConditioner.className = 'elementOfDev';
                            itemConditioner.id = `${setID()}`;
                            itemConditioner.style.background = '#d695a5';
                            itemConditioner.style.width = '33.3%'
                            itemConditioner.style.padding = '10px';
                            itemConditioner.style.border = '1px solid black'
                                containerForConditioner.appendChild(itemConditioner)

                            let itemIDArea = document.createElement('div');//---------------Блок ID 
                                itemConditioner.appendChild(itemIDArea)
                                let iDArea = document.createElement('p');
                                    itemIDArea.appendChild(iDArea)
                                    iDArea.innerHTML = `ID: ${setID()}`;
                        
                            let itemModelArea = document.createElement('div');//---------------Блок МОДЕЛИ 
                                itemConditioner.appendChild(itemModelArea)       
                                let modelArea = document.createElement('p');
                                    itemModelArea.appendChild(modelArea)
                                    modelArea.innerHTML = `Модель: ${lastElement.brandName}`;
                                
                            let areaForState = document.createElement('div');//---------------Блок СОСТОЯНИЯ 
                                itemConditioner.appendChild(areaForState)
                                let areaForCurrentState = document.createElement('p');
                                areaForState.appendChild(areaForCurrentState)
                                    if(lastElement.onOff){
                                        areaForCurrentState.innerHTML = 'Состояние: Включен.' 
                                    }else{
                                        areaForCurrentState.innerHTML = 'Состояние: Выключен.' 
                                    }
            
                                
                            let areaForTemp = document.createElement('div');//---------------Блок ТЕМПЕРАТУРЫ 
                                itemConditioner.appendChild(areaForTemp)
                                let areaForCurrentTemp = document.createElement('p');
                                areaForTemp.appendChild(areaForCurrentTemp)
                                areaForCurrentTemp.innerHTML = `Температура: ${lastElement.currentTemperature}`; 
            
            
                            let conAreaForModeOfFan = document.createElement('div');//---------------Блок РЕЖИМА ВЕНТИЛЯТОРА для кондиционера
                                itemConditioner.appendChild(conAreaForModeOfFan)
                                let conAreaForCurrentModeOfFan = document.createElement('p');
                                    conAreaForModeOfFan.appendChild(conAreaForCurrentModeOfFan)
                                    conAreaForCurrentModeOfFan.innerHTML = `Режим вентилятора: ${lastElement.currentFan}`;
            
            
            
                            let conAreaForModeOfCondititioner = document.createElement('div');//---------------Блок РЕЖИМ КОНДИЦИОНЕРА для кондиционера
                                itemConditioner.appendChild(conAreaForModeOfCondititioner)
                                let conAreaForCurrentModeOfCondititioner = document.createElement('p');
                                    conAreaForModeOfCondititioner.appendChild(conAreaForCurrentModeOfCondititioner)
                                    conAreaForCurrentModeOfCondititioner.innerHTML = `Режим кондиционера: ${lastElement.currentModeOfConditioner}`;
                            

                            
                        }else if(lastElement.constructor.name == 'Fridge'){//-------------Отрисовка ХОЛОДИЛЬНИКА--------------------
                            let itemFridge = document.createElement('div');
                            itemFridge.style.background = '#959fd6';
                            itemFridge.id = `${setID()}`;
                            itemFridge.className = 'elementOfDev';
                            itemFridge.style.padding = '10px';
                            itemFridge.style.width = '33.3%'
                            itemFridge.style.border = '1px solid black'
                                containerFoFridge.appendChild(itemFridge)
                        
                            let itemIDArea = document.createElement('div');//---------------Блок ID 
                                 itemFridge.appendChild(itemIDArea)
                                let iDArea = document.createElement('p');
                                    itemIDArea.appendChild(iDArea)
                                    iDArea.innerHTML = `ID: ${setID()}`;

                            let itemModelArea = document.createElement('div');//---------------Блок МОДЕЛИ 
                                itemFridge.appendChild(itemModelArea)       
                                let modelArea = document.createElement('p');
                                    itemModelArea.appendChild(modelArea)
                                    modelArea.innerHTML = `Модель: ${lastElement.brandName}`;
                            
                            let areaForState = document.createElement('div');//---------------Блок СОСТОЯНИЯ 
                                itemFridge.appendChild(areaForState)
                                let areaForCurrentState = document.createElement('p');
                                    areaForState.appendChild(areaForCurrentState)
                                        if(lastElement.onOff){
                                            areaForCurrentState.innerHTML = 'Состояние: Включен.' 
                                        }else{
                                            areaForCurrentState.innerHTML = 'Состояние: Выключен.' 
                                        }
            
                                
                            let areaForTemp = document.createElement('div');//---------------Блок ТЕМПЕРАТУРЫ 
                                itemFridge.appendChild(areaForTemp)
                                let areaForCurrentTemp = document.createElement('p');
                                        areaForTemp.appendChild(areaForCurrentTemp)
                                        areaForCurrentTemp.innerHTML = `Температура: ${lastElement.currentTemperature}`; 
                        

                            let frAreaForStateNoFrost = document.createElement('div');//---------------Блок СОСТОЯНИЯ NO FROST для холодильника
                                itemFridge.appendChild(frAreaForStateNoFrost)
                                let areaForCurrentNoFrostOFFridge = document.createElement('p');
                                    frAreaForStateNoFrost.appendChild(areaForCurrentNoFrostOFFridge)
                                        if(lastElement.offNoFrost()){
                                            areaForCurrentNoFrostOFFridge.innerHTML = 'NoFrost: Включен.' 
                                        }else{
                                            areaForCurrentNoFrostOFFridge.innerHTML = 'NoFrost: Выключен.' 
                                        }
                            


                            let frAreaForCurrentNoFrost = document.createElement('div');//---------------Блок СОСТОЯНИЯ NO FROST для холодильника
                                itemFridge.appendChild(frAreaForCurrentNoFrost)
                                let areaForCurrentValueNoFrostOFFridge = document.createElement('p');
                                        frAreaForCurrentNoFrost.appendChild(areaForCurrentValueNoFrostOFFridge)
                                        areaForCurrentValueNoFrostOFFridge.innerHTML = `Текущее значение NoFrost: ${lastElement.currentNoFrost}`; 
                        }
                        
                    });
/////////////////////////////////////////////////////////////////////////////////////////////////       
       


/////////////////////////////////////////////////////////////////////////////////Вывод инфы
        let conteinerForInfoSH = document.createElement('div');
            conteinerForInfoSH.style.margin = '5px';
            conteinerForInfoSH.style.minHeight = '20px';
/////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////Блок Кнопок
        let conteinerForButtonSH = document.createElement('div');
            let buttonAllOn = document.createElement('button');
                buttonAllOn.type = 'button';
                buttonAllOn.innerText = 'Вкл. все';
                buttonAllOn.id = 'butAllOn';
                buttonAllOn.addEventListener('click', () => {
                    this._smartHome.onAll()
                    for(let i in this._smartHome.deviсes){
                            let res = document.getElementById(String(i)).childNodes[2];
                                res.innerText = 'Состояние: Включен.';
                        }
                    conteinerForInfoSH.innerText = 'Все включено!';
                });
            let buttonAllOff = document.createElement('button');
                buttonAllOff.type = 'button';
                buttonAllOff.innerText = 'Выл. все';
                buttonAllOff.id = 'butAllOff';
                buttonAllOff.addEventListener('click', () => {
                    this._smartHome.offAll()
                    for(let i in this._smartHome.deviсes){
                        let res = document.getElementById(String(i)).childNodes[2];
                            res.innerText = 'Состояние: Выключен.';
                    }
                    conteinerForInfoSH.innerText = 'Все выключено!';
                });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////// Блок удаления элемента


        let containerForDeleteElements = document.createElement('div');
            containerForDeleteElements.style.padding = '10px';
            containerForDeleteElements.innerText = 'Удалить устройство: ';

            let inputDeleteElement = document.createElement('input');
                inputDeleteElement.placeholder = 'Введите ID устройства';
                inputDeleteElement.style.paddingLeft = '5px';
            
            let buttonDeleteElement = document.createElement('button');
                buttonDeleteElement.innerText = 'Удалить устройство';
                buttonDeleteElement.addEventListener('click', () => {
                    let valDelInput = inputDeleteElement.value;
                    conteinerForInfoSH.innerText = '';
                 
                    if(valDelInput >= 0 && valDelInput < this._smartHome.deviсes.length && this._smartHome.deviсes[valDelInput] !== undefined){
                        this._smartHome.delDevByID(valDelInput);
                        document.getElementById(valDelInput).remove();
                        inputDeleteElement.value = '';
                    }else{
                        inputDeleteElement.value = '';
                        conteinerForInfoSH.innerText = 'Такого ID не существует!';
                    }
                });





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        


//////////////////////////////////////////////////////////////////////////////Блок Выбора элемента


            let containerForChooseElement = document.createElement('div');
                let containerForToolsChooseElement = document.createElement('div');
                    containerForToolsChooseElement.innerText = 'Выбрать устройство: ';
                    containerForToolsChooseElement.style.padding = '10px';

                    let inputForChooseElement = document.createElement('input');
                        inputForChooseElement.placeholder = 'Введите ID устройства';
                        inputForChooseElement.style.paddingLeft = '5px';

                    let buttonForChooseElement = document.createElement('button');
                        buttonForChooseElement.innerText = 'Выбрать устройтво';
                        buttonForChooseElement.addEventListener('click', () => {
                            conteinerForInfoSH.innerText = '';
                            let valChooseInput = inputForChooseElement.value;
                            
                            if(valChooseInput >= 0 && valChooseInput < this._smartHome.deviсes.length && this._smartHome.deviсes[valChooseInput] !== undefined){
                                let obj = this._smartHome.getDevByID(valChooseInput);
                                
                                
                                if(obj.constructor.name == 'Fridge'){
                    
                                    itemForChooseElement.style.background = 'yellow';
                                    itemForChooseElement.style.width = '20%'
                                    itemForChooseElement.style.border = '1px solid black'
                                    let containerForChooseElement = document.createElement('div'); 
                                        itemForChooseElement.appendChild(containerForChooseElement)
                                        containerForChooseElement.style.padding = '10px';
                                         containerForChooseElement.style.width = '100%';
                                        containerForChooseElement.id = `${document.getElementById(valChooseInput).childNodes[0].textContent}`;
                   
                                        
                                    let itemIDArea = document.createElement('div');//---------------Блок ID 
                                        containerForChooseElement.appendChild(itemIDArea)
                                            let iDArea = document.createElement('p');
                                                itemIDArea.appendChild(iDArea)
                                                iDArea.innerHTML = document.getElementById(valChooseInput).childNodes[0].textContent;  
                                                
                                            
                                    let itemModelArea = document.createElement('div');//---------------Блок МОДЕЛИ 
                                        containerForChooseElement.appendChild(itemModelArea)       
                                            let modelArea = document.createElement('p');
                                                itemModelArea.appendChild(modelArea)
                                                modelArea.innerHTML = document.getElementById(valChooseInput).childNodes[1].textContent;
                                                
                                    let areaForState = document.createElement('div');//---------------Блок СОСТОЯНИЯ 
                                        areaForState.style.display = 'flex';
                                        areaForState.style.justifyContent = 'space-between';
                                        areaForState.style.alignItems = 'center';
                                        containerForChooseElement.appendChild(areaForState)
                                            let areaForCurrentState = document.createElement('p');
                                                areaForState.appendChild(areaForCurrentState)
                                                areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                            
                                            let containerForButtonOnOff = document.createElement('div');
                                                areaForState.appendChild(containerForButtonOnOff)
                                                let buttonOn = document.createElement('button');
                                                    containerForButtonOnOff.appendChild(buttonOn)
                                                    buttonOn.innerText = 'Включить';
                                                    buttonOn.addEventListener('click', () => {
                                                        obj.on();
                                                        document.getElementById(valChooseInput).childNodes[2].textContent = 'Состояние: Включен.';
                                                        document.getElementById(valChooseInput).childNodes[2].style.marginTop = '16px';
                                                        document.getElementById(valChooseInput).childNodes[2].style.marginBottom = '16px';
                                                        areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                                    });

                                                let buttonOff = document.createElement('button');
                                                    containerForButtonOnOff.appendChild(buttonOff)
                                                    buttonOff.innerText = 'Выключить';
                                                    buttonOff.addEventListener('click', () => {
                                                        obj.off();
                                                        document.getElementById(valChooseInput).childNodes[2].textContent = 'Состояние: Выключен.';
                                                        document.getElementById(valChooseInput).childNodes[2].style.marginTop = '16px';
                                                        document.getElementById(valChooseInput).childNodes[2].style.marginBottom = '16px';
                                                        areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                                    });

                                    let areaForTemp = document.createElement('div');//---------------Блок ТЕМПЕРАТУРЫ 
                                        containerForChooseElement.appendChild(areaForTemp)
                                        areaForTemp.style.display = 'flex';
                                        areaForTemp.style.justifyContent = 'space-between';
                                        areaForTemp.style.alignItems = 'center';
                                        let areaForCurrentTemp = document.createElement('p');
                                            areaForTemp.appendChild(areaForCurrentTemp)
                                            areaForCurrentTemp.innerText = document.getElementById(valChooseInput).childNodes[3].textContent;
                                        let containerForSetTemper = document.createElement('div');
                                            areaForTemp.appendChild(containerForSetTemper)
                                            containerForSetTemper.innerText = 'Введите тепературу от 5 до 15';
                                            containerForSetTemper.style.display = 'flex';
                                            containerForSetTemper.style.flexDirection = 'column';
                                            containerForSetTemper.style.alignItems = 'flex-end';
                                            containerForSetTemper.style.padding = '5px';

                                            let areaForSetTemper = document.createElement('input');
                                                containerForSetTemper.appendChild(areaForSetTemper)
                                                areaForSetTemper.style.width = '60px';
                                                areaForSetTemper.style.margin = '10px';
                                                areaForSetTemper.style.paddingLeft = '5px';
                                            let buttonForSetTemper = document.createElement('button');
                                                containerForSetTemper.appendChild(buttonForSetTemper)
                                                buttonForSetTemper.innerText = 'Ok';
                                                buttonForSetTemper.style.width = '40px';
                                                buttonForSetTemper.style.margin = '10px';
                                                buttonForSetTemper.addEventListener('click', () => {
                                                    let val = areaForSetTemper.value;
                                                    if(Number(val) <= 15 && Number(val) >= 5){
                                                        obj.currentTemperature = (Number(val));
                                                        areaForCurrentTemp.innerHTML = `Температура: ${obj.currentTemperature}`; 
                                                        document.getElementById(valChooseInput).childNodes[3].style.marginTop = '16px';
                                                        document.getElementById(valChooseInput).childNodes[3].style.marginBottom = '16px';
                                                        document.getElementById(valChooseInput).childNodes[3].textContent = `Температура: ${obj.currentTemperature}`;
                                                        areaForSetTemper.value = '';
                                                    }else{
                                                        areaForSetTemper.value = '';
                                                        conteinerForInfoSH.innerText = 'Некорректный диапазон температур!';
                                                    } 
                                                });

                                    let areaForStateNoFrost = document.createElement('div');//---------------Блок СОСТОЯНИЯ NO FROST для холодильника
                                        containerForChooseElement.appendChild(areaForStateNoFrost)
                                        areaForStateNoFrost.style.display = 'flex';
                                        areaForStateNoFrost.style.justifyContent = 'space-between';
                                        areaForStateNoFrost.style.alignItems = 'center';
                                        let areaForCurrentNoFrostOFFridge = document.createElement('p');
                                            areaForStateNoFrost.appendChild(areaForCurrentNoFrostOFFridge)
                                            areaForCurrentNoFrostOFFridge.innerText = document.getElementById(valChooseInput).childNodes[4].textContent;

                                        let containerToolsNoFrostOFFridge = document.createElement('div');
                                            areaForStateNoFrost.appendChild(containerToolsNoFrostOFFridge)

    
                                            let buttonOnNoFrost = document.createElement('button');
                                                containerToolsNoFrostOFFridge.appendChild(buttonOnNoFrost)
                                                buttonOnNoFrost.innerText = 'Включить';
                                                buttonOnNoFrost.addEventListener('click', () => {
                                                    obj.onNoFrost();
                                                    document.getElementById(valChooseInput).childNodes[4].textContent = 'NoFrost: Включен.';
                                                    document.getElementById(valChooseInput).childNodes[4].style.marginTop = '16px';
                                                    document.getElementById(valChooseInput).childNodes[4].style.marginBottom = '16px';
                                                    areaForCurrentNoFrostOFFridge.innerText = document.getElementById(valChooseInput).childNodes[4].textContent;
                                                });

                                            let buttonOffNoFrost = document.createElement('button');
                                                containerToolsNoFrostOFFridge.appendChild(buttonOffNoFrost)
                                                buttonOffNoFrost.innerText = 'Выключить';
                                                buttonOffNoFrost.addEventListener('click', () => {
                                                    obj.offNoFrost();
                                                    document.getElementById(valChooseInput).childNodes[4].textContent = 'NoFrost: Выключен.';
                                                    document.getElementById(valChooseInput).childNodes[4].style.marginTop = '16px';
                                                    document.getElementById(valChooseInput).childNodes[4].style.marginBottom = '16px';
                                                    areaForCurrentNoFrostOFFridge.innerText = document.getElementById(valChooseInput).childNodes[4].textContent;
                                                });


                                    let areaForCurrentNoFrost = document.createElement('div');//---------------Блок СОСТОЯНИЯ NO FROST для холодильника
                                        containerForChooseElement.appendChild(areaForCurrentNoFrost)
                                        areaForCurrentNoFrost.style.display = 'flex';
                                        areaForCurrentNoFrost.style.justifyContent = 'space-between';
                                        areaForCurrentNoFrost.style.alignItems = 'center';
                                        let areaForCurrentStateNoFrost = document.createElement('p');
                                            areaForCurrentNoFrost.appendChild(areaForCurrentStateNoFrost)
                                            areaForCurrentStateNoFrost.innerText = document.getElementById(valChooseInput).childNodes[5].textContent;

                                            let containerForSetNoFrost = document.createElement('div');
                                            areaForCurrentNoFrost.appendChild(containerForSetNoFrost)
                                            containerForSetNoFrost.innerText = 'Введите значение от 1 до 10';
                                            containerForSetNoFrost.style.display = 'flex';
                                            containerForSetNoFrost.style.flexDirection = 'column';
                                            containerForSetNoFrost.style.alignItems = 'flex-end';
                                            containerForSetNoFrost.style.padding = '5px';

                                            let areaForSetNoFrost = document.createElement('input');
                                                containerForSetNoFrost.appendChild(areaForSetNoFrost)
                                                areaForSetNoFrost.style.width = '60px';
                                                areaForSetNoFrost.style.margin = '10px';
                                                areaForSetNoFrost.style.paddingLeft = '5px';
                                            let buttonForSetNoFrost = document.createElement('button');
                                                containerForSetNoFrost.appendChild(buttonForSetNoFrost)
                                                buttonForSetNoFrost.innerText = 'Ok';
                                                buttonForSetNoFrost.style.width = '40px';
                                                buttonForSetNoFrost.style.margin = '10px';
                                                buttonForSetNoFrost.addEventListener('click', () => {
                                                    let val = areaForSetNoFrost.value;
                                                    if(Number(val) <= 10 && Number(val) >= 1){
                                                        obj.currentNoFrost = (Number(val));
                                                        areaForCurrentStateNoFrost.innerHTML = `Текущее значение NoFrost: ${obj.currentNoFrost}`;
                                                        document.getElementById(valChooseInput).childNodes[5].textContent = `Текущее значение NoFrost: ${obj.currentNoFrost}`;
                                                        document.getElementById(valChooseInput).childNodes[5].style.marginTop = '16px';
                                                        document.getElementById(valChooseInput).childNodes[5].style.marginBottom = '16px';
                                                        areaForSetNoFrost.value = '';
                                                    }else{
                                                        areaForSetNoFrost.value = '';
                                                        conteinerForInfoSH.innerText = 'Некорректный диапазон значений!';
                                                    }
                                                });

                                    let saveButton = document.createElement('button');//---------------Блок Завершения
                                        containerForChooseElement.appendChild(saveButton)
                                        saveButton.innerText = 'Завершить управление';
                                        saveButton.style.marginTop = '5px';
                                        saveButton.addEventListener('click', () => {
                                            document.getElementById(document.getElementById(valChooseInput).childNodes[0].textContent).remove();
                                        });

                                   
                                        
                                }else if(obj.constructor.name == 'Conditioner'){//////////////////////////////
                                    itemForChooseElement.style.background = 'yellow';
                                    itemForChooseElement.style.width = '20%'
                                    itemForChooseElement.style.border = '1px solid black'
                                    let containerForChooseElement = document.createElement('div'); 
                                        itemForChooseElement.appendChild(containerForChooseElement)
                                        containerForChooseElement.style.padding = '10px';
                                        containerForChooseElement.style.width = '100%';
                                        containerForChooseElement.id = `${document.getElementById(valChooseInput).childNodes[0].textContent}`;

                                    let itemIDArea = document.createElement('div');//---------------Блок ID 
                                        containerForChooseElement.appendChild(itemIDArea)
                                        let iDArea = document.createElement('p');
                                            itemIDArea.appendChild(iDArea)
                                            iDArea.innerHTML = document.getElementById(valChooseInput).childNodes[0].textContent;  

                                    let itemModelArea = document.createElement('div');//---------------Блок МОДЕЛИ 
                                        containerForChooseElement.appendChild(itemModelArea)       
                                        let modelArea = document.createElement('p');
                                            itemModelArea.appendChild(modelArea)
                                            modelArea.innerHTML = document.getElementById(valChooseInput).childNodes[1].textContent;


                                    let areaForState = document.createElement('div');//---------------Блок СОСТОЯНИЯ 
                                        areaForState.style.display = 'flex';
                                        areaForState.style.justifyContent = 'space-between';
                                        areaForState.style.alignItems = 'center';
                                        containerForChooseElement.appendChild(areaForState)
                                        let areaForCurrentState = document.createElement('p');
                                            areaForState.appendChild(areaForCurrentState)
                                            areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                        
                                        let containerForButtonOnOff = document.createElement('div');
                                            areaForState.appendChild(containerForButtonOnOff)
                                            let buttonOn = document.createElement('button');
                                                containerForButtonOnOff.appendChild(buttonOn)
                                                buttonOn.innerText = 'Включить';
                                                buttonOn.addEventListener('click', () => {
                                                    obj.on();
                                                    document.getElementById(valChooseInput).childNodes[2].textContent = 'Состояние: Включен.';
                                                    areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                                    document.getElementById(valChooseInput).childNodes[2].style.marginTop = '16px';
                                                    document.getElementById(valChooseInput).childNodes[2].style.marginBottom = '16px';
                                                });

                                            let buttonOff = document.createElement('button');
                                                containerForButtonOnOff.appendChild(buttonOff)
                                                buttonOff.innerText = 'Выключить';
                                                buttonOff.addEventListener('click', () => {
                                                    obj.off();
                                                    document.getElementById(valChooseInput).childNodes[2].textContent = 'Состояние: Выключен.';
                                                    areaForCurrentState.innerText = document.getElementById(valChooseInput).childNodes[2].textContent;
                                                    document.getElementById(valChooseInput).childNodes[2].style.marginTop = '16px';
                                                    document.getElementById(valChooseInput).childNodes[2].style.marginBottom = '16px';
                                                });

                                            let areaForTemp = document.createElement('div');//---------------Блок ТЕМПЕРАТУРЫ 
                                                containerForChooseElement.appendChild(areaForTemp)
                                                areaForTemp.style.display = 'flex';
                                                areaForTemp.style.justifyContent = 'space-between';
                                                areaForTemp.style.alignItems = 'center';
                                            let areaForCurrentTemp = document.createElement('p');
                                                areaForTemp.appendChild(areaForCurrentTemp)
                                                areaForCurrentTemp.innerText = document.getElementById(valChooseInput).childNodes[3].textContent;
                                            let containerForSetTemper = document.createElement('div');
                                                areaForTemp.appendChild(containerForSetTemper)
                                                containerForSetTemper.innerText = 'Диапазон температур от 12 до 27';
                                                containerForSetTemper.style.display = 'flex';
                                                containerForSetTemper.style.flexDirection = 'column';
                                                containerForSetTemper.style.alignItems = 'flex-end';
                                                containerForSetTemper.style.padding = '5px';
    
                                                let containerButtonTemp = document.createElement('div');
                                                    containerForSetTemper.appendChild(containerButtonTemp)
                                                    containerButtonTemp.style.margin = '5px';

                                                    let buttonIncrease = document.createElement('button');
                                                        containerButtonTemp.appendChild(buttonIncrease)
                                                        buttonIncrease.innerText = '+';
                                                        buttonIncrease.style.margin = '5px';
                                                        buttonIncrease.addEventListener('click', () => {
                                                            obj.increaseCurrentTemperature()
                                                            document.getElementById(valChooseInput).childNodes[3].textContent = `Температура: ${obj.currentTemperature}`;
                                                            areaForCurrentTemp.innerText = `Температура: ${obj.currentTemperature}`; 
                                                            document.getElementById(valChooseInput).childNodes[3].style.marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[3].style.marginBottom = '16px';
                                                        });

                                                    let buttonDecrease = document.createElement('button');
                                                        containerButtonTemp.appendChild(buttonDecrease)
                                                        buttonDecrease.innerText = '-';
                                                        buttonDecrease.style.margin = '5px';
                                                        buttonDecrease.addEventListener('click', () => {
                                                            obj.decreaseCurrentTemperature()
                                                            document.getElementById(valChooseInput).childNodes[3].textContent = `Температура: ${obj.currentTemperature}`;
                                                            areaForCurrentTemp.innerText = `Температура: ${obj.currentTemperature}`; 
                                                            document.getElementById(valChooseInput).childNodes[3].style.marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[3].style.marginBottom = '16px';
                                                        });


                                            let conAreaForModeOfFan = document.createElement('div');//---------------Блок РЕЖИМА ВЕНТИЛЯТОРА для кондиционера
                                                containerForChooseElement.appendChild(conAreaForModeOfFan)
                                                conAreaForModeOfFan.style.display = 'flex';
                                                conAreaForModeOfFan.style.justifyContent = 'space-between';
                                                let conAreaForCurrentModeOfFan = document.createElement('p');
                                                    conAreaForModeOfFan.appendChild(conAreaForCurrentModeOfFan)
                                                    conAreaForCurrentModeOfFan.innerHTML = `Режим вентилятора: ${obj.currentFan}`;
                                                let containerToolsModeOfFan = document.createElement('div');
                                                    containerToolsModeOfFan.style.display = 'flex';
                                                    containerToolsModeOfFan.style.alignItems = 'center';
                                                    conAreaForModeOfFan.appendChild(containerToolsModeOfFan)


                                                    let previousModeOfFan = document.createElement('button');
                                                        previousModeOfFan.innerText = '<';
                                                        previousModeOfFan.style.margin = '5px';
                                                        containerToolsModeOfFan.appendChild(previousModeOfFan)
                                                        previousModeOfFan.addEventListener('click', () => {
                                                            obj.previousModeOfFan();
                                                            conAreaForCurrentModeOfFan.innerHTML = `Режим вентилятора: ${obj.currentFan}`;
                                                            document.getElementById(valChooseInput).childNodes[4].textContent = `Режим вентилятора: ${obj.currentFan}`;
                                                            document.getElementById(valChooseInput).childNodes[4].marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[4].style.marginBottom = '16px';
                                                        });

                                                    let nextModeOfFan = document.createElement('button');
                                                        nextModeOfFan.innerText = '>';
                                                        nextModeOfFan.style.margin = '5px';
                                                        containerToolsModeOfFan.appendChild(nextModeOfFan)
                                                        nextModeOfFan.addEventListener('click', () => {
                                                            obj.nextModeOfFan();
                                                            conAreaForCurrentModeOfFan.innerHTML = `Режим вентилятора: ${obj.currentFan}`;
                                                            document.getElementById(valChooseInput).childNodes[4].textContent = `Режим вентилятора: ${obj.currentFan}`;
                                                            document.getElementById(valChooseInput).childNodes[4].style.marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[4].style.marginBottom = '16px';
                                                        });


                                            let conAreaModeOfConditioner = document.createElement('div');//---------------Блок РЕЖИМА КОНДИЦИОНЕРА
                                                containerForChooseElement.appendChild(conAreaModeOfConditioner)
                                                conAreaModeOfConditioner.style.display = 'flex';
                                                conAreaModeOfConditioner.style.justifyContent = 'space-between';
                                            let conAreaForCurrentModeOfConditioner = document.createElement('p');
                                                conAreaModeOfConditioner.appendChild(conAreaForCurrentModeOfConditioner)
                                                conAreaForCurrentModeOfConditioner.innerHTML = `Режим кондиционера: ${obj.currentModeOfConditioner}`;
                                            let containerToolsModeOfConditioner = document.createElement('div');
                                                containerToolsModeOfConditioner.style.display = 'flex';
                                                containerToolsModeOfConditioner.style.alignItems = 'center';
                                                conAreaModeOfConditioner.appendChild(containerToolsModeOfConditioner)


                                                let selectModeOfConditioner = document.createElement('select');
                                                    selectModeOfConditioner.style.margin = '5px';
                                                    containerToolsModeOfConditioner.appendChild(selectModeOfConditioner)

                                                    let option1InfoArea = document.createElement('option');
                                                        selectModeOfConditioner.appendChild(option1InfoArea)
                                                        option1InfoArea.innerHTML = 'heat';
                                                        option1InfoArea.value = 'heat';
                                                    let option2InfoArea = document.createElement('option');
                                                        selectModeOfConditioner.appendChild(option2InfoArea)
                                                        option2InfoArea.innerHTML = 'cool';
                                                        option2InfoArea.value = 'cool';

                                                let buttonOkModeOfConditioner = document.createElement('button');
                                                    buttonOkModeOfConditioner.style.margin = '5px';
                                                    buttonOkModeOfConditioner.innerText = 'ok';
                                                    containerToolsModeOfConditioner.appendChild(buttonOkModeOfConditioner)
                                                    buttonOkModeOfConditioner.addEventListener('click', () => {
                                                        if(selectModeOfConditioner.value == 'heat'){
                                                            obj.currentModeOfConditioner = 0;
                                                            conAreaForCurrentModeOfConditioner.innerHTML = `Режим кондиционера: ${obj.currentModeOfConditioner}`;
                                                            document.getElementById(valChooseInput).childNodes[5].textContent = `Режим кондиционера: ${obj.currentModeOfConditioner}`;
                                                            document.getElementById(valChooseInput).childNodes[5].style.marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[5].style.marginBottom = '16px';
                                                        }else if(selectModeOfConditioner.value == 'cool'){
                                                            obj.currentModeOfConditioner = 1
                                                            conAreaForCurrentModeOfConditioner.innerHTML = `Режим кондиционера: ${obj.currentModeOfConditioner}`;
                                                            document.getElementById(valChooseInput).childNodes[5].textContent = `Режим кондиционера: ${obj.currentModeOfConditioner}`;
                                                            document.getElementById(valChooseInput).childNodes[5].style.marginTop = '16px';
                                                            document.getElementById(valChooseInput).childNodes[5].style.marginBottom = '16px';
                                                        }
                                                    })
                                                

                                            let saveButton = document.createElement('button');//---------------Блок Завершения
                                                containerForChooseElement.appendChild(saveButton)
                                                saveButton.innerText = 'Завершить управление';
                                                saveButton.style.marginTop = '5px';
                                                saveButton.addEventListener('click', () => {
                                                    document.getElementById(document.getElementById(valChooseInput).childNodes[0].textContent).remove();
                                                });

                                           
                                            
                                }///...НОВЫЕ УСТРОЙСТВА........
                                inputForChooseElement.value = '';
                            }else{
                                inputForChooseElement.value = '';
                                conteinerForInfoSH.innerText = 'Такого ID не существует!';
                            }
                        });

                let itemForChooseElement = document.createElement('div');
                    itemForChooseElement.style.display = 'flex';
                    itemForChooseElement.style.flexWrap = 'wrap';
                   







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





        let conainerForAllDev = document.createElement('div');
            conainerForAllDev.style.display = 'flex';
            conainerForAllDev.style.width = '100%';
        
            let containerFoFridge = document.createElement('div');
                containerFoFridge.style.width = '50%';
                containerFoFridge.style.height = 'min-content';
                containerFoFridge.style.display = 'flex';
                containerFoFridge.style.flexWrap = 'wrap';
               
            let containerForConditioner = document.createElement('div');
                containerForConditioner.style.height = 'min-content';
                containerForConditioner.style.width = '50%';
                containerForConditioner.style.display = 'flex';
                containerForConditioner.style.flexWrap = 'wrap';



    ///////////ADD ELEMENT TO DOM//////////////////////////
        this._container.appendChild(containerInputInfo);
            containerInputInfo.appendChild(formInfoArea);
            formInfoArea.appendChild(inputInfoArea);
            formInfoArea.appendChild(selectInfoArea);
                selectInfoArea.appendChild(option1InfoArea);
                selectInfoArea.appendChild(option2InfoArea);
            formInfoArea.appendChild(inputInfoButton);

        this._container.appendChild(conteinerForInfoSH);
        this._container.appendChild(conteinerForButtonSH);
            conteinerForButtonSH.appendChild(buttonAllOn);
            conteinerForButtonSH.appendChild(buttonAllOff);

        this._container.appendChild(containerForDeleteElements);
            containerForDeleteElements.appendChild(inputDeleteElement);
            containerForDeleteElements.appendChild(buttonDeleteElement);

        this._container.appendChild(containerForChooseElement);
            containerForChooseElement.appendChild(containerForToolsChooseElement);
                containerForToolsChooseElement.appendChild(inputForChooseElement);
                containerForToolsChooseElement.appendChild(buttonForChooseElement);
            containerForChooseElement.appendChild(itemForChooseElement);





        this._container.appendChild(conainerForAllDev);
            conainerForAllDev.appendChild(containerFoFridge);
            conainerForAllDev.appendChild(containerForConditioner);
            
    
    }
    

}


let sh = new SmartHome1();


let viewSH = new ViewSmartHome(sh, document.getElementById('main'));
viewSH.performance()