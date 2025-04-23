
const ErrorMiddleware=async(err,req,res,next)=>{
res.status(err.status||500).json({
    message:err.message||"internal server error"
})
}
export default ErrorMiddleware;