function showError(sourceModal, data, callback) {
    sourceModal.modal('hide');
     
    var errText = "";
    data.errors.forEach(function (item) {
        $.each(item, function (key, value) {
            errText += value +"<br>";
        })
    })
    $('#errorModal .modal-body').html(errText);
    $('#errorModal').modal('show');
    if(typeof(callback) != "undefined"){
        callback(callback);
    }

}

function showSuccess(sourceModal,data,callback){
    sourceModal.modal('hide');successModal
    var successText = data.message;
    $('#successModal .modal-body').html(successText);
    $('#successModal').modal('show');
    if(typeof(callback) != "undefined"){
        callback(callback);
    }
}