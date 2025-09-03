document.addEventListener('DOMContentLoaded', function() {
  // 現在の日付を取得
  const today = new Date();
  // 日付を指定のフォーマットに変換する関数
  function dateFormat(date, format){
  format = format.replace("YYYY", date.getFullYear()); 
  format = format.replace("MM", ("0"+(date.getMonth() + 1)).slice(-2)); // 月を2桁にする
  format = format.replace("DD", ("0"+ date.getDate()).slice(-2)); // 日付を2桁にする
  return format;
}
  // 今日の日付を 'YYYY-MM-DD' 形式に変換
  const data = dateFormat(today,'YYYY-MM-DD');
  const field = document.getElementById('date');
  field.value = data; // 初期値に今日の日付を設定
  field.setAttribute("min", data);  // 過去の日付を選択不可にする

  // カレンダーを生成
  generateCalendar();
  field.addEventListener('change', generateCalendar); // 日付が変更された際にカレンダーを更新

  // ページ読み込み時に予約ボタンを無効化（押せない状態）にする
  const reservationButton = document.getElementById('reservationButton');
  reservationButton.disabled = true;

  // チェックボックスの状態に応じてボタン有効/無効を切り替える
  const checkbox = document.getElementById('confirm'); 
  checkbox.addEventListener('change', updateReservationButtonState);

  // フォーム要素を取得
  const reservationForm = document.getElementById('reservationForm');
  // フォーム送信時のイベントを設定
  reservationForm.addEventListener('submit', function(event) {
        if (!check()) {
        event.preventDefault(); // エラーがあれば送信停止
        return;
    }
    // フォームのaction属性に設定されたURLへ遷移（通常の送信処理)
    const actionUrl = this.getAttribute('action');
    window.location.href = "confirm.html";
  });
});

// 入力チェックを行う関数
function check(){
  let isValid = true;
  // 姓のチェック
  const checkLastName = document.getElementById("lastName").value.trim();
  if(checkLastName.length < 1){
    document.getElementById("lastNameErrorMsg").innerText = "※姓を入力してください"; 
    isValid = false;
  } else {
    document.getElementById("lastNameErrorMsg").innerText = ""; // エラーメッセージをクリアにする
  }
  // 名のチェック
  const checkFirstName = document.getElementById("firstName").value.trim();
  if(checkFirstName.length < 1){
    document.getElementById("firstNameErrorMsg").innerText = "※名を入力してください"; 
    isValid = false;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = ""; // エラーメッセージをクリアにする
  }
  // 電話番号のチェック
  const checkPhoneNumber = document.getElementById("phoneNumber").value.trim();
  if(checkPhoneNumber.length < 1){
    document.getElementById("phoneNumberErrorMsg").innerText = "※電話番号を入力してください"; 
    isValid = false;
  } else if (!/^\d+$/.test(checkPhoneNumber)) {
    document.getElementById("phoneNumberErrorMsg").innerText = "※半角数字で入力してください"; 
    isValid = false;
  } else {
    document.getElementById("phoneNumberErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  // メールアドレスのチェック
  const checkEmail = document.getElementById("email").value.trim();
  if(checkEmail.length < 1){
    document.getElementById("emailErrorMsg").innerText = "※メールアドレスを入力してください";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(checkEmail)) {
    document.getElementById("emailErrorMsg").innerText = "※正しいメールアドレスを入力してください";
    isValid = false;   
  } else {
    document.getElementById("emailErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  // 予約日のチェック
  const checkDate = document.getElementById("date").value.trim();
  if(checkDate.length < 8){
    document.getElementById("dateErrorMsg").innerText = "※予約したい日付を入力してください";
    isValid = false; 
  } else {
    document.getElementById("dateErrorMsg").innerText = ""; //エラーメッセージをクリアにする
  }
  
  return isValid;
}   


// カレンダーを生成する関数
function generateCalendar() {
  
  const dateInput = document.getElementById('date');
  const selectedDate = new Date(dateInput.value); // 選択された日付
  const calendarTable = document.getElementById('calendar');
   
  calendarTable.innerHTML = ''; // カレンダーを初期化

  if (dateInput.value !== '') {
      // 曜日の行を作成 
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
      //4週間分のカレンダーを生成
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

// 予約確認のチェックボックスの状態に応じて予約ボタンの有効・無効を切り替える
function updateReservationButtonState() {
  const checkbox = document.getElementById('confirm');
  const reservationButton = document.getElementById('reservationButton');
  if (checkbox.checked) {
    reservationButton.disabled = false; // チェックが入っていれば予約ボタンを有効にする
    reservationButton.style.backgroundColor = '#e58f0e'; // ボタンの色を変更する
  } else {
    reservationButton.disabled = true; // チェックが外れていれば予約ボタンを無効にする
    reservationButton.style.backgroundColor = '#ccc'; // 初期値に戻す
  }
};