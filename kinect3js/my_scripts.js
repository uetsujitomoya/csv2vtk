
$(function(){

    /*---------------------------------------------------------------------------------
    JSONデータ読み込み＆表示
    ---------------------------------------------------------------------------------*/
    //読み込んだデータを元にselect option要素作成
    makeOption();
    function makeOption() {
        //初期化
        $('#oldList').html("");
        $('#oldList').append('<option value="">---</option>');

        //JSON読み込みとコールバック処理
        $.getJSON("data.json", function(json){
            //配列の任意のポイントにアクセスするためのポインター番号をvalueに入れておく
            var pointer=0;
            for(var key in json){
                $('#oldList').append('<option value="' + pointer + '">' + json[key]['name'] + '</option>');
                pointer++;
            }
        });
    }

    //選ばれたvalueのポインター値によって該当する配列の内容表示
    $("select#oldList").change(function () {
        if($(this).val()) {
            //値があれば該当するポインターの内容をそれぞれに挿入
            $.getJSON("data.json", function(json){
                $("select#oldList option:selected").each(function () {
                    $("ul#result input#id").val(json[$(this).val()]['id']);
                    $("ul#result input#name").val(json[$(this).val()]['name']);
                    $("ul#result input#type").val(json[$(this).val()]['type']);
                    $("ul#result input#sex").val(json[$(this).val()]['sex']);
                });
            });
        } else {
            //値がなければ空に
            $('ul#result input').val('');
        }

    }).change();

    /*---------------------------------------------------------------------------------
    データ保存
    ---------------------------------------------------------------------------------*/
    $("#submit").click(function () {
        $.ajax({
            type: "POST",
            url: "save.php",
            data: "id=" + $("#id").val() + "&type=" + $("#type").val() + "&sex=" + $("#sex").val() + "&name=" + $("#name").val(),
            success: function(msg){
                makeOption();
                $('ul#result input').val('');
                $('div#msg').html(msg).css('display','block');
                setTimeout("$('div#msg').fadeOut(1000)", 2000);
            }
        });
    });

});
