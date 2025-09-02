
document.addEventListener('DOMContentLoaded', () => {

JavaScriptの
  
  // 現在の日付を取得
  const today = new Date();

  function dateFormat(today, format){
  format = format.replace("YYYY", today.getFullYear());
  format = format.replace("MM", ("0"+(today.getMonth() + 1)).slice(-2));
  format = format.replace("DD", ("0"+ today.getDate()).slice(-2));
  return format;
}
  const data = dateFormat(today,'YYYY-MM-DD');
  const field = document.getElementById('date');
  field.value = data;
  field.setAttribute("min", data);

  generateCalendar();
  
  field.addEventListener('change', generateCalendar);

  // ページ読み込み時に予約ボタンを無効化（押せない状態）にする
  const reservationButton = document.getElementById('reservationButton');
  reservationButton.disabled = true;

    // フォーム要素を取得
  const reservationForm = document.getElementById('reservationForm');

  const checkbox = document.getElementById('confirm');
  checkbox.addEventListener('change', () => {
    check(); // バリデーション
    updateReservationButtonState(); // ボタン状態更新
  });
  // フォーム送信時のイベントを設定
  reservationForm.addEventListener('submit', function(event) {
    // バリデーションが失敗した場合
    if (!check()) {
        event.preventDefault(); // デフォルトのフォーム送信をキャンセル
    }
  });
  
});

// エラーメッセージを表示する共通関数
function displayError(elementId, message) {
    const errorMsgElement = document.getElementById(elementId);
    if (errorMsgElement) {
        errorMsgElement.innerText = message;
    }
}

function check() {
    let isValid = true;

    // 姓のバリデーション
    const lastName = document.getElementById("lastName").value.trim();
    if (lastName.length < 1) {
        displayError("lastNameErrorMsg", "※姓を入力してください");
        isValid = false;
    } else {
        displayError("lastNameErrorMsg", "");
    }

    // 名のバリデーション
    const firstName = document.getElementById("firstName").value.trim();
    if (firstName.length < 1) {
        displayError("firstNameErrorMsg", "※名を入力してください");
        isValid = false;
    } else {
        displayError("firstNameErrorMsg", "");
    }

    // 電話番号のバリデーション
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    if (phoneNumber.length < 1) {
        displayError("phoneNumberErrorMsg", "※電話番号を入力してください");
        isValid = false;
    } else if (!/^\d+$/.test(phoneNumber)) {
        displayError("phoneNumberErrorMsg", "※半角数字で入力してください");
        isValid = false;
    } else {
        displayError("phoneNumberErrorMsg", "");
    }

    // メールアドレスのバリデーション
    const email = document.getElementById("email").value.trim();
    if (email.length < 1) {
        displayError("emailErrorMsg", "メールアドレスを入力してください");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        displayError("emailErrorMsg", "※正しいメールアドレスを入力してください");
        isValid = false;
    } else {
        displayError("emailErrorMsg", "");
    }

    // 日付のバリデーション
    const date = document.getElementById("date").value.trim();
    if (date.length < 8) {
        displayError("dateErrorMsg", "※予約したい日付を入力してください");
        isValid = false;
    } else {
        displayError("dateErrorMsg", "");
    }

    return isValid;
}  



function generateCalendar() {
  
  const dateInput = document.getElementById('date');
  const selectedDate = new Date(dateInput.value);
  const calendarTable = document.getElementById('calendar');
  
  // カレンダーの日付を4週間分生成
  calendarTable.innerHTML = '';

  if (dateInput.value !== '') {
      // 
      const dayOfWeekRow = calendarTable.insertRow();
      const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      for (let i = 0; i < 7; i++) {
          const cell = dayOfWeekRow.insertCell();
          cell.textContent = daysOfWeek[i];
          // 土曜日のセルの文字色を青色に設定
          if (i === 6) {
              cell.style.color = 'blue';
          }
          // 日曜日のセルの文字色を赤色に設定
          if (i === 0) {
              cell.style.color = 'red';
          }
          // 曜日の文字のみ太字に設定
          cell.style.fontWeight = 'bold';
      }

      // 選択された日付をカレンダーの1週目になるように調整
      const firstDayOfWeek = new Date(selectedDate);
      firstDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
      // カレンダーの日付を生成
      for (let i = 0; i < 4; i++) {
        const weekRow = calendarTable.insertRow();
    
        for (let j = 0; j < 7; j++) {
          const cell = weekRow.insertCell();
          const currentDate = new Date(firstDayOfWeek);
          currentDate.setDate(firstDayOfWeek.getDate() + i * 7 + j);
          cell.textContent = currentDate.getDate();
    
          // 土曜日のセルの文字色を青色に設定
          if (currentDate.getDay() === 6) {
            cell.style.color = "blue";
          }
          // 日曜日のセルの文字色を赤色に設定
          if (currentDate.getDay() === 0) {
            cell.style.color = "red";
          }
          
          // 選択された日付を一致するセルの背景色を黄色にする
          if (currentDate.toDateString() === selectedDate.toDateString()) {
            cell.style.backgroundColor = "yellow";
          }
        }
      }
  }
}

// チェックボックスの状態に応じて予約ボタンの有効・無効を切り替える
  function updateReservationButtonState() {
    const checkbox = document.getElementById('confirm');
    const reservationButton = document.getElementById('reservationButton');
  
    if (checkbox.checked) {
      reservationButton.disabled = false; // チェックが入っていれば予約ボタンを有効にする
      reservationButton.style.backgroundColor = '#e58f0e'; // ボタンの色を変更する
    } else {
      reservationButton.disabled = true; // チェックが外れていれば予約ボタンを無効にする
      // reservationButton.style.backgroundColor = ''; // 色を元に戻す場合はここを有効化
    }
  }