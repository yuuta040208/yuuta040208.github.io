
/**
 * HTML、JSの全ての要素が読み込まれてから呼ばれるイベント
 */
document.addEventListener('deviceready', function() {
    console.log('setting.html#deviceready');

    $('#back-btn').on('click', function() {
        window.location.href = 'index.html';
    });

    $('#add-btn').on('click', function() {
        
    });

    $('.picker').colorPick({
        'allowRecent': false,
        onColorSelected: function() {
            // $('#listview').append($('#color-row').html());

            // console.log("The user has selected the color: " + this.color)
            // this.element.css({'backgroundColor': this.color, 'color': this.color});
        } 
    });

    // console.log($('#color-row').html());

}, false);
