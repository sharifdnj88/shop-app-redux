import swal from "sweetalert";

// Basic sweetAlert
export const sweetAlertBasic = (msg) => {
    swal(msg);
}

// Standard sweetAlert
export const sweetAlertStandard = (msg, type="success") => {
    swal(msg.title, msg.msg, type, { timer: 3000 });
    // swal(msg.title, msg.msg, type, { timer: 3000,  className: "swal-container" });
}

// Confirm sweetAlert
export const sweetAlertConfirm = (msg, type="success") => {
    swal({
        title: msg.title,
        text: msg.msg,
        icon: type,
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!", {
            icon: "success",
          });
        }
      });
}