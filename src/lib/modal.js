import Swal from 'sweetalert2'



export const  successmsg = (title,text)  => {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: "#3085d6",

    });
}
export const  errorMsg = (title,text)  => {
    Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonColor: "red",

    });
}



