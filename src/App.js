import './App.css';

function App() {
  return (
    <div className="app">
      <input type="text" className="inp"></input>
      <div className="wrapper">
        <form className="formInput">
          <input type="radio" name="inp" className="registrOn"></input><label>Регистр вкл</label>
          <input type="radio" name="inp" className="registrOff"></input><label>Регистр выкл</label>
        </form>
      </div>
      <div>
        <p><b>Фильтры:</b></p>
        <button className="btnLength">Длина слова</button>
        <button className="btnSubString">Подстрочный</button>
      </div>
      <hr></hr>
      <div className="divData">
        <p>Вывод данных:
        <p className="pData"></p>
        </p>
      </div>
    </div>
  );
}

// HTTP запрос
let url = "http://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json";
let xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Accept", "*/*");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    let data = (JSON.parse(xhr.responseText).data);
    let oldArray = document.querySelector(".pData").textContent = data;
    let newArray = oldArray.slice();


    // Регистр включен
    document.querySelector(".registrOn").addEventListener('change', function () {
      document.querySelector(".inp").onkeyup = function () {
        document.querySelector(".pData").innerHTML = '';
        let l = this.value.length;
        if (l > 0) {
          for (let i = 0; i < newArray.length; i++) {
            let _ = newArray[i].split('').slice(0, l).join('');
            if (_ === this.value) {
              document.querySelector(".pData").innerHTML += newArray[i] + '<br/>';
            }
          }
        }
      };
    })


    // Регистр выключен
    document.querySelector(".registrOff").addEventListener('change', function () {
      document.querySelector(".inp").onkeyup = function () {
        document.querySelector(".pData").innerHTML = '';
        let l = this.value.length;
        if (l > 0) {
          for (let i = 0; i < newArray.length; i++) {
            let _ = newArray[i].toLowerCase().split('').slice(0, l).join('');
            if (_ === this.value) {
              document.querySelector(".pData").innerHTML += newArray[i] + '<br/>';
            }
          }
        }
      };
    })


    // Фильтр по длине строки
    document.querySelector(".btnLength").addEventListener("click", function () {
      let arrayNonSortLength = data.filter(function (element) {
        return element.length > document.querySelector(".inp").value;
      });
      document.querySelector(".pData").textContent = arrayNonSortLength;
    })


    // Фильтр по подстроке
    document.querySelector(".btnSubString").addEventListener("click", function () {
      let arraySortSubstr = data.filter(function (element) {
        if (document.querySelector(".registrOff").checked) {
          return element.toLowerCase().includes(document.querySelector(".inp").value.toLowerCase());
        } else {
          // console.log(!!`document.querySelector(".registrOff").value`)
          return element.includes(document.querySelector(".inp").value);
        }
      });
      document.querySelector(".pData").textContent = arraySortSubstr;
    })
  }

};

xhr.send();


export default App;
