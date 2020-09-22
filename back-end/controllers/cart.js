const Carts = require('../models/cart')

exports.addItemtoCart = (req,res) => {

    Carts.findOne({user: req.user._id})
    .exec((error,cart)=>{
        if(error) res.status(400).json({error})
        if(cart){
            //Kiểm tra sản phẩm có trong giỏ hàng hay chưa
            //nếu có thì tăng quantity lên 1 
            const product = req.body.cartItems.product
            const item =  cart.cartItems.find(c => c.product == product)
            let condition, update
            if(item){
                condition = {"user": req.user._id, "cartItems.product": product}
                update = {
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
            }else{
                condition = {user: req.user._id}
                update = {
                    "$push":{
                        "cartItems": req.body.cartItems
                    }
                }
            }
            Carts.findOneAndUpdate(condition,update).exec((error,_cart) => {
                if(error) return res.status(400).json({error})
                if(_cart) return res.status(201).json({cart: _cart})
            })
        }else{
            //nếu không thì tạo giỏ hàng mới
            const cart = new Carts({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
            cart.save((error,cart) => {
                if(error) return res.status(400).json({error})
                if(cart) {
                    return res.status(200).json({cart})
                }
            })
        }
    })
}