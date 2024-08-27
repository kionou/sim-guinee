import Swal from 'sweetalert2'



export const  successmsg = (title,text)  => {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: "#3085d6",

    });
}



