(function() {
    var type_impls = Object.fromEntries([["gdk4_sys",[]],["gdk_pixbuf_sys",[]],["gio_sys",[]],["glib_sys",[]],["graphene_sys",[]],["gsk4_sys",[]],["gtk4_sys",[]],["libadwaita_sys",[]],["libpanel_sys",[]],["pango_sys",[]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[15,22,15,16,20,16,16,22,20,17]}