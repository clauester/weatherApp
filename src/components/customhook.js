
const useHook = () => {
    let date = new Date();
  
    const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat" ];
  
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  
    const formatDate = (dias) => {
      let dia = date.getDay() + dias;
  
      let formatted_date =
        day[dia > 6 ? dia - 7 : dia] +
        " " +
        (date.getDate() + dias) +
        " " +
        months[date.getMonth()] +
        "";
      return formatted_date;
    };
  
    const openNav =()=> {
      document.getElementById("mySidenav").style.width = "28.5vw";
    }
  
    const closeNav = () => {
      document.getElementById("mySidenav").style.width = "0";
    }
  
    return {
      formatDate,
      openNav,
      closeNav

    };
  };
  
  export default useHook;
  