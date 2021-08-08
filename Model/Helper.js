(function(){
    class Helper{
        // 2 tizedesjegyig kerekít
        numberRounding(number){
            return Math.round(number * 100) / 100;
        }
    }

    window.Helper = new Helper;
})();