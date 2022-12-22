import fs from "fs";
import moment from "moment";
import os from "os";

const format1 = "YYYY-MM-DD HH:mm:ss";
const SHORT_MONTH = [
  "",
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
export default {
  log(msg) {
    console.log(`++++++${msg}++++++`);
  },
  checkCpu() {
    let totalram = os.totalmem();
    let freeram = os.freemem();
    console.log("Total Ram ", totalram);
    console.log("Free Ram ", freeram);

    const used = freeram / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  },
  readJsonFile(fileName = "") {
    if (fileName == "") {
      fileName = "./data/data.json";
    } else {
      fileName = `./data/${fileName}`;
    }
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, "utf8", (err, jsonString) => {
        if (err) {
          reject("Error reading file from disk:", err);
        }
        try {
          const data = JSON.parse(jsonString);
          resolve(data);
        } catch (err) {
          reject("Error parsing JSON string:", err);
        }
      });
    });
  },
  writeJsonFile(data, fileName = "") {
    if (fileName == "") {
      fileName = "./data/data.json";
    } else {
      fileName = `./data/${fileName}`;
    }
    return new Promise((resolve, reject) => {
      // console.log("+++อัพเดทไฟล์ config สำเร็จ+++");
      const jsonString = JSON.stringify(data);
      fs.writeFile(fileName, jsonString, (err) => {
        if (err) {
          reject("Error writing file:", err);
        } else {
          console.log("+++อัพเดทไฟล์ Config สำเร็จ+++");
          resolve("success");
        }
      });
    });
  },

  getItem(label) {
    let data = localStorage.getItem(label);
    return Promise.resolve(data);
  },
  setItem(label, value) {
    localStorage.setItem(label, value);
    return Promise.resolve("success");
  },
  currentDateTime() {
    const current_date = moment().format(format1);
    return current_date;
  },
  convertDateTime(dateTime) {
    const current_date = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    return current_date;
  },
  convertDateYmdHms(date) {
    return moment(date).format(format1);
  },
  convertThDateToYmdHms(date) {
    let dataParam = date.split(" ");
    let dataArr = [];
    for (let i of dataParam) {
      if (i) {
        dataArr.push(i);
      }
    }
    //return dataArr;
    let day = dataArr[0];
    if (parseInt(day) < 10) {
      day = `0${day}`;
    }
    let month = dataArr[1];
    let year = moment().format("YY") + "" + dataArr[2];
    let time = dataArr[3];
    let m = SHORT_MONTH.findIndex((m) => m == month);
    if (m != -1) {
      if (m < 10) {
        m = `0${m}`;
      }
    }

    let result = `${year}-${m}-${day} ${time}`;
    // return result;
    return moment(result).format(format1);
  },
  convertSeconds(date) {
    return moment(date).format("ss");
  },
  timeSeconds(date, s) {
    //seconds
    const current_date = moment(date).add(s, "seconds").format("ss");
    return current_date;
  },
  dateSeconds(date, s) {
    //seconds
    const current_date = moment(date).add(s, "seconds");
    return current_date;
  },

  countDownDate(endDate, sDate = "") {
    let startDate = new Date().getTime();
    if (sDate != "") {
      startDate = new Date(sDate).getTime();
    }

    let countDownDate = new Date(endDate).getTime();
    let timeleft = countDownDate - startDate;

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    let dDisplay = days > 0 ? days + (days == 1 ? " วัน " : " วัน ") : "";
    let hDisplay = hours > 0 ? hours + (hours == 1 ? ":" : ":") : "";
    let mDisplay = minutes > 0 ? minutes + (minutes == 1 ? ":" : ":") : "";
    let sDisplay = seconds > 0 ? seconds + (seconds == 1 ? "" : "") : "";
    let diffDate = dDisplay + hDisplay + mDisplay + sDisplay;
    if (diffDate) {
      diffDate = moment(timeleft).add("-7", "hours").format("HH:mm:ss");
      if (dDisplay) diffDate = dDisplay + diffDate;
    }
    return diffDate;
  },
};
