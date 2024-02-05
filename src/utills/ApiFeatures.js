class ApiFeatures {
    constructor(query, querystr){
        this.query = query; // query or all the products in the database
        this.querystr = querystr; // keyword

    }
    search(){
        // console.log(this)
        let keyword = this.querystr.keyword ? { // eg ,  if keyword exist than find name else '{} empty' means return all 
            name : { // findind name as query of mongodb
                // regex = regular expression
                $regex : this.querystr.keyword, // it means any name matching with keyword
                $options : 'i' // case insensitive
            }
        } : {} 
        // this.query = this.query.find({name:this.name}) // we can use this but this will not return all products when there is no query
        // finding full ...keyword because if there would be query than it will find only specific products otherwise all.
        this.query = this.query.find({...keyword}) // name : query.insensitive
        return this // return yhi class 
    }
    filter(){
        // this is case senitive
        let queryCopy = {...this.querystr}; // we need copy of query because we dont want to change the query itself
        // in order to do copy we will always use {...this.query} instead of this.query in Class
        // because we running the filter and search function at same timw
   
        // we will remove the other queries from url to filter items properly
        let queryToBeRemove = ['keyword', 'page', 'limit']// delete these from url 
        queryToBeRemove.forEach((keys)=> delete queryCopy[keys]) // delete these from url queryCopy because it contains all queries and we want just one that is filter by category
        // this.query = this.query.find(queryCopy)
        // console.log(queryCopy)

        // filter for pricing
        let myStr = JSON.stringify(queryCopy)
        myStr = myStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`) // e.g gt = $gt = greaterthan in mongodb  
        this.query = this.query.find(JSON.parse(myStr)) //eg,{"category":"laptop","price":{"$gte":"1400","$lt":"2000"}}
        return this // returning all things
    }
    pagination(resultPerPage){
        let currentPage = Number(this.querystr.page) || 1;
        let skipPage = resultPerPage * (currentPage - 1) // how many pages we will skip
        // let totalProducts = this.query.clone().countDocuments()
        this.query = this.query.limit(resultPerPage).skip(skipPage) // e,g limit(10).skip(10) skip first 10 and show next 10
        return this
    }
}

module.exports = ApiFeatures