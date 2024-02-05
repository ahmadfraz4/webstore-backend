module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
    // returning a function if resolves othervise catching it
};
//    now we dont need trycatch block we can wrap function in this function and it returns another function 
