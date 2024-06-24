const pricingStrategies = {
    furniture: {
        discount: (product) => product.price - (product.price * (product.discountPercentage / 100)),
        hasDiscount: true
    },
    // Add more categories as needed
    default: {
        discount: (product) => product.price,
        hasDiscount: false
    }
}


export const getPrice = (product) => {
    if(!product || !product.price) return 0
    const strategy = pricingStrategies[product.category] || pricingStrategies.default
    return strategy.discount(product)
}


export const hasDiscount = (product) => {
    if(!product || !product.price) return 0
    const strategy = pricingStrategies[product.category] || pricingStrategies.default
    return strategy.hasDiscount
}
