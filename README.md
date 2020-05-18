# Blog - MongoDB Operators  
This project injects fake library DB and lets you practice querying with MongoDB.
  
## Getting started:  
1. `git clone` this repo
2. Use `cd` to the repo folder and run `npm install`
3. Make sure MongoDB is running in the background (if you can't remember how, see the explanation at the bottom)  
4. Run `npm run populate` to insert the fake data to your MongoDB.
5. Open Compass and see the new data!

## Your tasks:
Filter the data according to the following criterias.
Use the official documentation:
[https://docs.mongodb.com/manual/reference/operator/query/](https://docs.mongodb.com/manual/reference/operator/query/)

1. Users with the first name "noah" (3 documents)
2. Users with the title "miss" and first name "melissa" (2 documents)
3. Posts with the tag "culpa" (44 documents)
4. Posts with more than 900 likes (48 documents)
5. Posts with less than 10 likes with the tag "quis" (1 document)
6. Posts that were created on this date: "2015-10-05 13:34:49.000" (1 document)
7. Posts that were created after this date: "2017-02-07 06:32:12.000" (222 documents)
8. Posts that were created after July 1st, 2018 (138 documents)
9. How many posts got between 100 to 200 likes? (49 documents)
10. How many comments got the post with the greatest amount of likes?

---  

### How to run MongoDB:  
- On Mac: just run `mongod`  
- On Windows:  
Run `cd C:\Program Files\MongoDB\Server\4.0\bin`  
Then run `mongod`
