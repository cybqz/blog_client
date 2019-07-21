let formatDate = val=>{
	let oDate = new Date(val);  
    let oYear = oDate.getFullYear();  
    let oMonth = oDate.getMonth()+1;  
    let oDay = oDate.getDate();  
    let oHour = oDate.getHours();  
    let oMin = oDate.getMinutes();  
    let oSec = oDate.getSeconds();  
   	let oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
    return oTime;
}
function getzf(num){  
     if(parseInt(num) < 10){  
         num = '0'+num;  
     }  
     return num;  
 }
 export { formatDate }