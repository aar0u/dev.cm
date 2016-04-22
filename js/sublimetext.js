$(function() {
    var os = '';
    var shortcutsData;

    function loadJsonData() {
        if (!shortcutsData) {
            $.getJSON('js/shortcuts.json', function(data) {
                shortcutsData = data;
                updateContent(shortcutsData);
            });
        } else {
            updateContent(shortcutsData);
        }
    }

    function updateContent(data) {
        assetData('.element.text-manipulation', data.textManipulation);
        assetData('.element.navigation', data.navigation);
        assetData('.element.find-replace', data.findReplace);
        assetData('.element.general', data.general);
        assetData('.element.bookmarks', data.bookmarks);
        assetData('.element.split-window', data.splitWindow);
        assetData('.element.tabs', data.tabs);
        assetData('.element.editing', data.editing);
        assetData('.element.code-folding', data.codeFolding);
    }

    function assetData(elementseKeyword, ds) {
        $(elementseKeyword).each(function(index, ele) {
            var $ele = $(ele),
                data = ds.data,
                cate = ds.category;
            $ele.find('.category')[0].innerHTML = cate;
            if (getParam('lang') === 'en') {
                $ele.find('.desc.jp')[0].innerHTML = data[index].descJp;
                $ele.find('.command, .desc.en').text(data[index].descEn);
            } else {
                $ele.find('.command, .desc.en').text(data[index].descCn);
            }
            $ele.find('.keypress').html(data[index]['keypress' + os]);
        });
    }

    $('.element').click(function() {
        var $self = $(this).hasClass('active');
        $('.periodic-table').find('.active').removeClass('active').find('.info').fadeOut(300);
        if (!$self) {
            $self = $(this).addClass('active');
            var $info = $self.find('.info');
            $info.fadeIn(300);

            var container = $self.parents('.container');
            var pw = container.width() + container.offset().left;
            var iw = $info.width() + $info.offset().left;
            if (iw >= pw) {
                $info.addClass('align-right');
            }
        }
    });

    $('#osBtnGroup').find('a').click(function(e) {
        e.preventDefault();
        $('#osBtnGroup').find('li').removeClass('active');
        $(this).parent().addClass('active');
        os = $(this).data().os === 'mac' ? 'Mac' : '';
        loadJsonData();
    });

    loadJsonData();
});

function getParam(key) {
    var re = new RegExp(key + '=(.*?)(?=&|$)');
    var match = document.URL.match(re);
    if (match) {
        return match[1];
    }
}
