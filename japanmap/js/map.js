let selectedColor = '#ffffff';

let areas = [
    {
        code : 1,
        name: "",
        color: "#aaa",
        hoverColor: "#aaa",
        prefectures: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]
    },
    {
        code : 2,
        name: "",
        color: "#111",
        hoverColor: "#111",
        prefectures: []
    }
];

let mapWidth = window.innerWidth * 0.95;
let scrollWidth = 0;

var scrollStopEvent = new $.Event("scrollstop");
var delay = 500;
var timer;
 
function scrollStopEventTrigger(){
if (timer) {
        clearTimeout(timer);
    }
        timer = setTimeout(function(){$('#map-container').trigger(scrollStopEvent)}, delay);
    }

$('#map-container').on("touchmove", scrollStopEventTrigger);

/**
 * HTML、JSの全ての要素が読み込まれてから呼ばれるイベント
 */
document.addEventListener('deviceready', function() {
    console.log('index.html#deviceready');

    // localStorage.removeItem('JMAP');

    setAreas();
    createMap(-1);

    $('#map-container').css('height', mapWidth + 10);

    /**
     * マップエリアのスクロール値を取得する
     */
    $('#map-container').on('scrollstop', function(){
        var sl = $('#map-container').scrollLeft();
        scrollWidth = sl;

        createMap(-1);

        console.log(scrollWidth);
    });

    /* スライダー変更中（ドラッグ中） */
    $(document).on( 'input change', '#slider', function () {
        console.log($(this).val());

        mapWidth = window.innerWidth * 0.95 + ($(this).val() * 50) ;

        createMap(-1);
    } );


    // $('#twice').on('click', function() {
    //     mapWidth = window.innerWidth * 2;

    //     createMap(-1);
    // });

    // $('#single').on('click', function() {
    //     mapWidth = window.innerWidth * 0.95;

    //     createMap(-1);
    // });

    $('.picker').colorPick({
        'initialColor': selectedColor,
        'allowRecent': false,
        onColorSelected: function() {
            selectedColor = this.color;
            areas[1].color = selectedColor;
            areas[1].hoverColor = selectedColor;

            this.element.css({'backgroundColor': this.color});

            createMap(-1);
        } 
    });

    /**
     * 戻るボタン押下時
     */
    $('#back-btn').on('click', function() {
        window.location.href = 'index.html';
    });

    /**
     * 保存ボタン押下時
     */
    $('#save-btn').on('click', function() {
        let title = $('#title').val();

        if(title === '') {
            alert('タイトルを入力してください');
        } else {
            let array = [];
            if(localStorage.getItem('JMAP') != null) {
                array = JSON.parse(localStorage.getItem('JMAP'));
            }

            let json = { "title": title, "map": areas };
            let id = getParameter().id;

            if(id == undefined) {
                array.push(json);
            } else {
                array[id] = json;
            }

            localStorage.setItem('JMAP', JSON.stringify(array));

            window.location = 'index.html?save=1';
        }
    });

}, false);

/**
 * マップエリアを描画する
 */
function createMap(code) {
    $('#map-container').html('');

    areas = getAreas(code);

    $('#map-container').japanMap({
        scrollWidth: scrollWidth,
        width: mapWidth,
        drawsBoxLine: false,
        movesIslands: true,
        areas: areas,
        onSelect : function(data) {
            createMap(data.code);
        }
    });
}

/**
 * エリア情報を返す
 */
function getAreas(code) {
    if(code == -1) return areas;

    let index_1 = areas[0].prefectures.indexOf(code);
    let index_2 = areas[1].prefectures.indexOf(code);

    if(index_1 !== -1) {
        areas[0].prefectures.splice(index_1, 1);
        areas[1].prefectures.push(code);
    } else {
        areas[1].prefectures.splice(index_2, 1);
        areas[0].prefectures.push(code);
    }

    return areas;
}

/**
 * ローカルストレージからエリアデータを取得する
 */
function setAreas() {
    let array = [];
    if(localStorage.getItem('JMAP') != null && getParameter().id >= 0) {
        array = JSON.parse(localStorage.getItem('JMAP'));
        let id = getParameter().id;

        areas = array[id].map;
        $('#title').val(array[id].title);
        selectedColor = array[id].map[1].color;
    }
}

/**
 * URLからパラメータを取得する
 */
function getParameter(){
    let paramMap = {};
    let url = location.href; 
    let parameters = url.split('?');

    if(parameters.length > 1) {
        let params = parameters[1].split('&');
        // パラメータ数繰り返し
        for (i = 0; i < params.length; i++) {
           let paramItem = params[i].split('=');
           paramMap[paramItem[0]] = paramItem[1];
        }
    }

    return paramMap;
};