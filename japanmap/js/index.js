
/**
 * HTML、JSの全ての要素が読み込まれてから呼ばれるイベント
 */
document.addEventListener('deviceready', function() {
    console.log('index.html#deviceready');

    let isTaphold = false;

    if(getParameter().save == 1) {
        swal(
            '保存しました！',
            null,
            'success'
        )
    }

    $('#plus-btn').on('click', function() {
        window.location.href = 'map.html';
    });

    let array = JSON.parse(localStorage.getItem('JMAP'));

    array.forEach((elem, index) => {
        let title = elem.title;

        let element = '<li class="ui-first-child ui-last-child">' +
                          '<a href="#" id="list-' + index + '" class="ui-btn ui-btn-icon-right ui-icon-carat-r">' +
                              title +
                          '</a>' +
                      '</li>';

        $('#listview').append(element);

        let selecter = '#list-' + index;
        
        $(selecter).on('click', function() {
            if(!isTaphold) window.location.href = 'map.html?id=' + index;
            isTaphold = false;
        });

        $(selecter).on('taphold', function() {
            isTaphold = true;

            swal({
              title: '削除してもよろしいですか？',
              text: null,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#aaaaaa',
              confirmButtonText: '削除',
              cancelButtonText: 'キャンセル'
            }).then((result) => {
              if (result.value) {
                swal(
                  '削除しました！',
                  null,
                  'success'
                ).then((result) => {
                    window.location = 'index.html';
                });

                deleteStorageMap(index);
              }
            })
            
            console.log(index + ' longtap');
        });

    });
}, false);


// データを削除するメソッド
function deleteStorageMap(id) {
    let array = [];
    if(localStorage.getItem('JMAP') != null) {
        array = JSON.parse(localStorage.getItem('JMAP'));
    }

    array.splice(id, 1);

    localStorage.setItem('JMAP', JSON.stringify(array));
}


// パラメータを取得するメソッド
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