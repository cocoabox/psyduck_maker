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
        },
        is_mobile = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
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
            $("#loading").hide();
        }
        else {
            /* running on a web server */
            $("#loading").show();
            window.LOADING = {};

            for (var i = 0; i <= MAX_INDEX; ++i) {
                var idx = "" + i;
                if (idx.length < 2) { idx = "0" + idx; }
                var fn = idx + ".png";

                image_urls[idx] = fn;
                window.LOADING[fn] = true;
                console.log("loading", fn);
                var on_done_or_error =  function(ev){
                    var src = $(this).attr("src");
                    window.setTimeout(function(){
                        window.LOADING[src] = false;
                        console.log("preload end:", src);

                        /* detect if all images are loaded; if true then hide
                         * the loading screen */
                        var still_loading = false;
                        for (var k in window.LOADING) {
                            if (window.LOADING.hasOwnProperty(k)) {
                                if ( window.LOADING[k] ) {
                                    still_loading = true;
                                }
                            }
                        }
                        if (! still_loading) {
                            console.log("done loading");
                            $("#loading").hide();
                        }
                    },300);
                };
                /* preload image */
                $('<img/>')
                    .attr({src: fn})
                    .on("load", on_done_or_error)
                    .on("error", on_done_or_error);
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
        if(! $("ul.images .caption").length) {
            alert("画像がないっす");
            return;
        }
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
                        if (is_mobile()) {
                            window.location.href = url;
                        }
                        else if (! shift) {
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
