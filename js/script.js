window.addEventListener('DOMContentLoaded', () => {

    // CreateBlocks

    function createDate(wrapperBlock, optionElement) {
        let Data = new Date();
        let Year = Data.getFullYear();
        let Month = Data.getMonth();
        let Day = Data.getDate();
        let fMonth = "";
    
        switch (Month)
        {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мая"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
        }

        const createNowDay = () => {
            const wrapper = document.querySelector(wrapperBlock);
            const option = document.createElement(optionElement);
            option.textContent = `Сегодня: ${Day} ${fMonth} ${Year}`;
            option.value = `${option.textContent}`;
            option.setAttribute('id','check');
            wrapper.append(option);
        };

        const createTomorrowDay = () => {
            const wrapper = document.querySelector(wrapperBlock);
            const option = document.createElement(optionElement);
            option.textContent = `Завтра: ${Day + 1} ${fMonth} ${Year}`;
            option.value = `${option.textContent}`;
            wrapper.append(option);
        };

        const nextDay = () => {
            for (let i = 2; i < 8; i++) {
                const wrapper = document.querySelector(wrapperBlock);
                const option = document.createElement(optionElement);
                option.textContent = `${Day + i} ${fMonth} ${Year}`;
                option.value = `${option.textContent}`;
                wrapper.append(option);
            }
        };

        createNowDay();
        createTomorrowDay();
        nextDay();
        
    }

    createDate('.data .list_wrapper', 'option');

    function createTime() {
        let Data = new Date();
        let Hour = Data.getHours();
        const blockChecked = document.querySelector("#post-form > div.data > select");
        const optionData = document.getElementById('check');

        blockChecked.addEventListener('change', () => {
            if (Hour >= 10 && Hour <= 19 && optionData.selected === true) {
                const optionRemove = document.querySelectorAll('.time .list_wrapper option');
                Array.from(optionRemove).map((item) => item.remove());

                for (let i = Hour; i < 20; i++) {
                    const wrapper = document.querySelector('.time .list_wrapper');
                    const option = document.createElement('option');
                    option.textContent = `${i}:00`;
                    option.value = `${option.textContent}`;
                    wrapper.append(option);
                }
            } else  if (Hour > 19 && optionData.selected === true) {
                const optionRemove = document.querySelectorAll('.time .list_wrapper option');
                Array.from(optionRemove).map((item) => item.remove());
                createDefaultValueTimeText();
                console.log('На сегодня нет доступного времени! Выберите другой день.');
            } else {
                const optionRemove = document.querySelectorAll('.time .list_wrapper option');
                Array.from(optionRemove).map((item) => item.remove());
                createTimeDefault();
            }
        });

        const createTimeDefault = () => {
            for (let i = 10; i < 20; i++) {
                const wrapper = document.querySelector('.time .list_wrapper');
                const option = document.createElement('option');
                option.textContent = `${i}:00`;
                option.value = `${option.textContent}`;
                wrapper.append(option);
            }    
        };
        
        createTimeDefault();
    }

    createTime();

    function createDefaultValueTimeText() {
        const listWrapper = document.querySelector("#post-form > div.time > select");
        const option = document.createElement('option');
        option.disabled = true;
        option.textContent = `На сегодня нет доступного времени! Выберите другой день.`;
        listWrapper.append(option);
    }
    
    function createRestList(wrapperBlock) {
        for (let i = 3; i < 28; i++) {
            const wrapper = document.querySelector(wrapperBlock);
            const option = document.createElement('option');
            option.textContent = `Этаж: ${i}`;
            option.value = `${i}`;
            wrapper.append(option);
        }
    }

    function createRestListRooms(wrapperBlock) {
        for (let i = 1; i < 11; i++) {
            const wrapper = document.querySelector(wrapperBlock);
            const option = document.createElement('option');
            option.textContent = `Переговорная №${i}`;
            option.value = `${i}`;
            wrapper.append(option);
        }
    }
    
    createRestList('.floors .list_wrapper');
    createRestListRooms('.rooms .list_wrapper');

    // Clear Inputs

    function clearInputs(btn, sectionSelect) {
        let btnClear = document.querySelector(btn);
        let option = document.querySelector(sectionSelect).getElementsByTagName('option');
        btnClear.addEventListener('reset', () => {
            option[0].selected = true;
            let area = document.querySelector('.comment textarea');
            if (area.value) {
                area.value = '';
            }
        });
    }

    clearInputs('.clear_btn', '.towers .list_wrapper');
    clearInputs('.clear_btn', '.floors .list_wrapper');
    clearInputs('.clear_btn', '.rooms .list_wrapper');
    clearInputs('.clear_btn', '.data .list_wrapper');
    clearInputs('.clear_btn', '.time .list_wrapper');

    // FormData

    function serializeForm(formNode) {
        const { elements } = formNode;
      
        const data = new FormData();
      
        Array.from(elements)
          .filter((item) => !!item.name)
          .forEach((element) => {
            const { name, type } = element;
            const value = type === 'checkbox' ? element.checked : element.value;
      
            data.append(name, value);
        });
    
        const object = {};
        data.forEach(function(value, key) {
            object[key] = value;
        });

        const textarea = document.querySelector('textarea');
        const optionTime = document.querySelector("#post-form > div.time > select > option");

        for (let key in object) {
            if (object[key] === 'null' || object[key] === '' || textarea.value === '') {
                return console.log('Вы не отметили все поля!');
            } else {
                return console.log(JSON.stringify(object));
            }
        }
    }
    
    function handleFormSubmit(event) {
        event.preventDefault();
        serializeForm(applicantForm);
    }
        
    const applicantForm = document.getElementById('post-form');
    applicantForm.addEventListener('submit', handleFormSubmit);
    
});
