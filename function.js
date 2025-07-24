
document.addEventListener('DOMContentLoaded', function() {
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
});


function check(){
  const checkLastName = document.getElementById("lastName").value.trim();
  if(checkLastName.length < 1){
    const validateLastName = "※姓を入力してください";
    document.getElementById("lastNameErrorMsg").innerText = validateLastName; 
    return false; 
  } else {
    document.getElementById("lastNameErrorMsg").innerText = ""; // エラーメッセージをクリアにする
  }
  
  const checkFirstName = document.getElementById("firstName").value.trim();
  if(checkFirstName.length < 1){
    const validateFirstName = "※名を入力してください";
    document.getElementById("firstNameErrorMsg").innerText = validateFirstName; 
    return false; 
  } else {
    document.getElementById("firstNameErrorMsg").innerText = ""; // エラーメッセージをクリアにする
  }

  const checkPhoneNumber = document.getElementById("phoneNumber").value.trim();
  if(checkPhoneNumber.length < 1){
    const validatePhoneNumber = "※電話番号を入力してください";
    document.getElementById("phoneNumberErrorMsg").innerText = validatePhoneNumber; 
    return false; 
  } else if (!/^\d+$/.test(checkPhoneNumber)) {
    const validateNumber = "※半角数字で入力してください";
    document.getElementById("phoneNumberErrorMsg").innerText = validateNumber; 
    return false;
  } else {
    document.getElementById("phoneNumberErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  const checkEmail = document.getElementById("email").value.trim();
  if(checkEmail.length < 1){
    const validateEmail = "メールアドレスを入力してください";
    document.getElementById("emailErrorMsg").innerText = validateEmail; 
    return false; 
  } else {
    document.getElementById("emailErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  const checkDate = document.getElementById("date").value.trim();
  if(checkDate.length < 8){
    const validateDate = "※予約したい日付を入力してください";
    document.getElementById("dateErrorMsg").innerText = validateDate; 
    return false; 
  } else {
    document.getElementById("dateErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  // どの項目もエラーがない場合はtrueを返す
  return true;
}   



function generateCalendar() {
  
  const dateInput = document.getElementById('date');
  const selectedDate = new Date(dateInput.value);
  const calendarTable = document.getElementById('calendar');
  
  // 
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
      for (let i = 0; i < 3; i++) {
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

// ページ読み込み時に予約ボタンを無効化（押せない状態）にする
document.addEventListener("DOMContentLoaded", function() {
  const reservationButton = document.getElementById('reservationButton');
  reservationButton.disabled = true;
});

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
document.addEventListener('DOMContentLoaded', function() {
  // フォーム要素を取得
  const reservationForm = document.getElementById('reservationForm');
  
  // フォーム送信時のイベントを設定
  reservationForm.addEventListener('submit', function(event) {
      // フォームのaction属性に設定されたURLへ遷移（通常の送信処理)
      const actionUrl = this.getAttribute('action');
      window.location.href = actionUrl;
  });
});