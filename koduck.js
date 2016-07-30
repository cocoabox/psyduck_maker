$(function(){
    var body = $("body"),
        ONE_PIXEL_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
        BROKEN_GIF = 'data:image/gif;base64,R0lGODlhKgAuAPcAAAAAAAAAhAAA/wCEAAD/AAD//4QAhISEhMbGxt7e3v8A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAKgAuAAAI/gAXCBxIsKDBgwgTKlzIsKHDhwgPSJxIsaLFixgnJhB4AKLHghsXdPxIMuRIkh5NDszIsuJClRxRcjx5EKZImSIR0AQZsyeCn0CDChXaUSdCmyOHUhwaNOlOgUgFEj0wYAACAACYGpX6NOqCpiMHUM3KlObWgV6bitVZdQBZogXPLkgLlOpaAlXfBsXKly9Buj8PsG2LVatFAH973vxaF0BbtwAkGqaIGK3ipHsd95Ws9afAylAvSyXKd2lnBJ8TL15ctuJpzxJVn8SslGKBi1ln0kwr2LDRAsAFFAgQWWRs2Su56lUKvIBwAcRnGuS9YHnT4M4F6O4q+utI64GdoDtfObFmd6MKqpcNvj0hdQXprc+mqPC9AgPqEYQkf7wg6LnndQSfAfFtVx5C/71H4H3pWbRQggEuYMCEBPWXEGrVIefTAfd15OBCGEK4WlJ9GWfhhSFqyJpOsZ2IUFCpWTbiaBgeqJBQMYY2Y4U2eiTibDw+BdGPA/UVmZAGGamkijg1ZFOTDD0JZX1QJWDllVhmqeWWXF455ZdgholSQAAAOw==',
        MAX_INDEX = 13,
        image_urls = {},
        get_image_url = function(idx) {
            return typeof image_urls[idx] === "undefined"
                ?   /* 通常画像URLはない‥ ローカル実行かな */
                    (typeof window.IMAGE_DATA === "undefined" 
                        ?   /* IMAGE_DATA もない... */ 
                            BROKEN_GIF
                        :   (
                                /* IMAGE_DATA はある‥ インデックスが存在する場合読み取る
                                 * なければ（◞‸◟） 
                                 */
                                typeof window.IMAGE_DATA[idx] !== "undefined"
                                ? window.IMAGE_DATA[idx]
                                : BROKEN_GIF
                            )
                    )
                :   image_urls[idx];
        };

        /* --- init URLs (or load images from JS) --- */
        if (document.location.protocol === "file:") {
            /* ローカルでは file:// 画像はレンダリングされない為、data:// 
             * URLで読み取るべき */
            var tag = document.createElement('script');
            tag.setAttribute('src','images_data.js');
            tag.setAttribute('type','text/javascript');
            document.head.appendChild(tag);
            console.log("image data served from images_data.js");
        }
        else {
            /* running on a web server */
            for (var i = 0; i <= MAX_INDEX; ++i) {
                var idx = "" + i;
                if (idx.length < 2) { idx = "0" + idx; }
                image_urls[idx] = idx + ".png";
            }
        }

    body.on("click", "#add_image_button", function(ev){
        ev.preventDefault();

        var li = $("#spare_parts .images_item").clone().data("image_index", "-1");
        /* pencil.png */
        if (typeof window.IMAGE_DATA !== "undefined" && 
            typeof window.IMAGE_DATA.pencil !== "undefined"
            ) 
        {
            li.find("img.pencil").attr("src", window.IMAGE_DATA.pencil);
        }

        li.insertBefore($("li#add_image"));
        li.find(".image_next_button").trigger("click");
        li.find(".text_box").focus();
        return false;
    });
    $(body).on("click", ".delete_button",  function(ev){
        ev.preventDefault();
        var me = $(this);
        if (1||confirm("削除してもよろしいっすか?")) {
            me.parents(".images_item").remove();
        }
        return false; 
    });

    var start_edit = function(ev){
        ev.preventDefault();

        var me = $(this),
            images_item = me.parents(".images_item"),
            caption = images_item.find(".caption");

        images_item.addClass("editing");
        images_item.find(".text_box")
            .val(caption.html())
            .focus();
        return false; 
    };

    body
        .on("click", ".caption, .pencil", start_edit)
        .on("focus", ".caption", start_edit);

    var confirm_edit = function(ev) {
        ev.preventDefault();

        var me = $(this),
            images_item = me.parents(".images_item");

        images_item.find(".caption").html(me.val());
        images_item.removeClass("editing");

        return false;
    };

    body
        .on("blur", ".text_box", confirm_edit)
        .on("keypress", ".text_box", function(ev){
            var me = $(this);
            if (event.which == 13 || event.keyCode == 13) {
                ev.preventDefault();
                confirm_edit.apply(me, [ev]);
                return false;
            }
            return true;
        });

    body.on("click", ".image_change_button", function(ev){
        var me = $(this),
            images_item = me.parents(".images_item"),
            background = images_item.find(".background"),
            delta = parseInt(me.data("index_change")),
            idx = parseInt(images_item.data("image_index"));

        idx += delta;
        if (idx > MAX_INDEX) { idx = 0; }
        else if (idx < 0) { idx = MAX_INDEX; }
        
        idx = "" + idx;
        if (idx.length < 2) {idx = "0" + idx; }

        images_item.data("image_index", idx);
        background.attr("src", get_image_url(idx));
    });

    body.on("click", "#save_image_button", function(ev){
        var shift = ev.shiftKey,
            images = $("ul.images").addClass("saving"),
            height = images.outerHeight(),
            width = images.outerWidth(),
            do_render = function() {
                html2canvas(images[0], {
                    useCORS: true,
                    allowTaint: false,
                    width: width,
                    height: height,
                    onrendered: function(canvas){ 
                        var url = canvas.toDataURL("image/jpeg");
                        images.removeClass("saving");
                        if (! shift) {
                            window.open(url);
                        }
                        else {
                            // download
                            var default_title = $(".caption:first").text(), 
                                fn = prompt("ファイル名（.pngは不要）", default_title ? default_title : "コダック");
                            if (fn) {
                                var link = document.createElement('a');
                                link.href = url;
                                link.download = fn + ".png";
                                document.body.appendChild(link);
                                link.click();  
                                setTimeout(function(){
                                    document.body.removeChild(link);
                                }, 500);
                            }
                        }
                    }
                });
            };

        setTimeout(do_render, 300);
    });

    /* SHIFT キーを検出する */
    body.on("keydown", function(ev) {
        var key;
        var isShift;
        if (window.event) {
            key = window.event.keyCode;
            isShift = !!window.event.shiftKey; // typecast to boolean
        } else {
            key = ev.which;
            isShift = !!ev.shiftKey;
        }
        if ( isShift ) {
            $("#save_image_button").addClass("shift");
        }

    });
    body.on("keyup", function() {
        $("#save_image_button").removeClass("shift");
    });
    
    /* ---- initialize ---- */
});
