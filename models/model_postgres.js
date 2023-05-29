import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let generateTextID=function(length=10){

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getDateXDaysAgo(numOfDays=3,date=new Date()){
    const daysAgo=new Date(date.getTime());
    daysAgo.setDate(date.getDate()-numOfDays);
    return daysAgo;
}


 const pool = new pg.Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,

 })

 

async function connect() {
    try {
        const client = await pool.connect();
        console.log("connected");
        return client
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function createTicketPassengerRelation(userID,data/*Object*/,callback){
    let date=new Date();
    let bID=generateTextID();
    const flightData=[data.dptFlightID, data.retFlightID];
    delete data.dptFlightID;
    delete data.retFlightID;
    if(typeof data.Fname ==='string'){
        data = {
        Fname: [data.Fname],
        Lname: [data.Lname],
        Email: [data.Email],
        Cellphone: [data.Cellphone],
        gender: [data.gender],
        'ID-Type': [data['ID-Type']]
        }
    }

    try{
        
        const client= await connect();
        let getFlightInfo=`SELECT * FROM "FlightLeg" WHERE "flightID"='${flightData[0]}';`;
        const resF= await client.query(getFlightInfo);

        let insertBooking=`INSERT INTO "Booking"("BookingID","Date","Time")VALUES('${bID}','${date.toLocaleDateString("en-GB")}','${date.toLocaleTimeString('en-GB')}');`;
        await client.query(insertBooking);
        const ticketIDs = [];
        for(let i=0;i<data.Fname.length;i++){
            let passenger={}
            // let pID=generateTextID();
            // passenger.passengerID = pID
            for(let info of Object.keys(data)){
                passenger[info] = data[info][i]
                
                /*CHECK IF EXISTS*/
                /*INSERT*/
            }
            let ticketID=generateTextID();
            

            //pasenger
            let sql=`INSERT INTO "Passenger"("Fname","Lname","Email","Cellphone"
        ,"Gender","ID_TYPE")VALUES('${passenger.Fname}','${passenger.Lname}','${passenger.Email}','${passenger.Cellphone}','${passenger.gender}','${passenger["ID-Type"]}') RETURNING "passengerID"`;
        const res= await client.query(sql);
        let insertTicket=`INSERT INTO "Ticket"("ticketID","NVA","NVB","Company","ticketType","Cost","purchaseDate","Return")VALUES('${ticketID}','${date.toLocaleDateString("en-GB")}','${date.toLocaleDateString("en-GB")}','${resF.rows[0].Company}','Flex','${resF.rows[0].Cost}','${date.toLocaleDateString("en-GB")}',${false})`;
        const resTicket=await client.query(insertTicket);
        let belongsSQL=`INSERT INTO "BelongsTo"("ticketID","passengerID")VALUES('${ticketID}','${res.rows[0].passengerID}')`;
        await client.query(belongsSQL);

        let findJourneyID=`select "j"."journeyID" 
        from "Journey" as "j" 
        inner join "Consists" as "c" on "j"."journeyID"="c"."journeyID"
        inner join "FlightLeg" as "fl" on "c"."flightID"="fl"."flightID"
        where "fl"."flightID"='${flightData[0]}';`
        let fID=await client.query(findJourneyID);
        let connectJourneyTicket=`INSERT INTO "Relates"("ticketID","journeyID")VALUES('${ticketID}','${fID.rows[0].journeyID}');`; 
        await client.query(connectJourneyTicket);

        let insertAnent=`INSERT INTO "Anent"("bookingID","ticketID")VALUES('${bID}','${ticketID}')`;
        await client.query(insertAnent);

        let connectUserandBooking=`INSERT INTO "Reserves"("userID","bookingID")VALUES('${userID}','${bID}');`;
        await client.query(connectUserandBooking);

       
        
        }
        await client.release();
        callback(null, 'yesnt');
        

    }catch(err){
        callback(null,err);

    }

    
};

async function postComplaint(userPassport,complaintInfo,callback){
    sql=`INSERT INTO "Complaints"("fullname","Email","Overview","Paragraph")VALUES();`;

    try{

    }catch(err){
        callback(null,err);
    }

}

async function returnBookings(ID,callback){
    let sql=`select "t"."ticketID"
    from "User" as "u" 
    inner join "Reserves" as "r" on "u"."ID"="r"."userID"
    inner join "Booking" as "b" on "r"."bookingID"="b"."BookingID"
    inner join "Anent" as "a" on "a"."bookingID"="b"."BookingID"
    inner join "Ticket" as "t" on "a"."ticketID"="t"."ticketID"
    WHERE "u"."ID"='${ID}'`;

    
    try{
        const client= await connect();
        const res1= await client.query(sql);
        
        const bookings = [];
        for(let i=0;i<res1.rows.length;i++){
            if(res1.rows[i].ticketID==='PRhbYKlXad'){
                continue;
            }
            let findlegs=`select "f"."startAirportID" , "f"."finishAirportID","f"."departureDate","f"."departureTime","f"."Company"
            from "Ticket" as "t" 
            inner join "Relates" as "r" on "r"."ticketID"="t"."ticketID"
            inner join "Journey" as "j" on "j"."journeyID"="r"."journeyID"
            inner join "Consists" as "co" on "co"."journeyID"="j"."journeyID"
            inner join "FlightLeg" as "f" on "f"."flightID"="co"."flightID"
            where "t"."ticketID"='${res1.rows[i].ticketID}';`
            let res2=await client.query(findlegs);

            if(res2.rows.startAirportID){
                bookings.push([res2.rows])
            }else{
                bookings.push(res2.rows);
            }
        }

    callback(null,bookings)

    }catch(error){
        callback(null,error);
    }
}

async function findJourneyViaCities(begin,beginDate,end,endDate=0,callback){
    let iataBegin={text:`SELECT  "airportID" FROM "Airport" WHERE "City"=$1 ;`,values:[begin]};
    let iataEnd={text:`SELECT  "airportID" FROM "Airport" WHERE "City"=$1 ;`,values:[end]};
    //let flightInfoReturn={text:`SELECT "flightID","Company","Cost","departureTime","arrivalTime FROM "FlightLeg" 
    //WHERE "startAirportID"='$1',"finishAirportID"='$2',"departureDate">='$3'`,values:[iataEnd.airportID,iataBegin.airportID,//endDate]};
    try{
        const client= await connect();
        const res1= await client.query(iataBegin);
        //res1.rows[0].airportID
        const res2=await client.query(iataEnd);
        const airpt1 = res1.rows[0].airportID;
        const airpt2 = res2.rows[0].airportID;
        
        //response = await db.query('SELECT * FROM products WHERE city = $1 AND region = $2 AND country = $3', [city,region,country]);
        let flightInfo=`SELECT "flightID","Company","Cost","departureTime","arrivalTime" FROM "FlightLeg" WHERE "startAirportID"='${res1.rows[0].airportID}' AND "finishAirportID"='${res2.rows[0].airportID}' AND "departureDate"='${beginDate}';`;
        const flightRes=await client.query(flightInfo);
        flightRes.rows[0]["begin"] = airpt1;
        flightRes.rows[0]["end"] = airpt2;

        callback(null, [flightRes.rows, []])
    }catch(error){
        callback(null, error);
    }
}

async function checkBookingID(bookingID,callback){
    const sql={text:`SELECT * FROM Booking WHERE "bookingID=$1"`,values:[bookingID]}
    try{
        const client =await connect();
        const res=await client.query(sql);
        let date=new Date();
        
        if(jQuery.isEmptyObject(res)){
            const action=await client.query(`INSERT INTO "Booking("bookingID","Date","Time") 
            VALUES('${bookingID}','${date.toLocaleTimeString}','${date.toLocaleTimeString}')"`);
            await client.release();
        }
        else{
            callback(null,row[0]);
            await client.release();
        }
    }catch(error){
        callback(null, error);
    }
}

async function findUser(Username, callback){
    console.log("findUser Function")
    const sql ={text: `SELECT * FROM "User" WHERE "Username"=$1`, values: [Username]} /*and "Password"='${Password}`*/;
    console.log("after query")
    try{
        const client= await connect();
        const res= await client.query(sql);
        console.log("Executed!")
        
        callback(null,res.rows);
        await client.release();

    }catch(error){
        callback(null, error);
    }

}

async function insertUser (ID,Fname,Lname,Email,Cellphone,Username, hashedPassword,NewsLetter, Salt, callback) {
    const sql = `INSERT INTO "User"("Fname","Lname","Email","Cellphone","Username","Password","NewsLetter","Salt") VALUES ('${Fname}','${Lname}','${Email}','${Cellphone}','${Username}','${hashedPassword}','${true}','${Salt}') RETURNING "ID";`
    console.log('to insert...', sql)
    //https://stackoverflow.com/questions/37243698/how-can-i-find-the-last-insert-id-with-node-js-and-postgresql
    try {
        const client = await connect();
        const res = await client.query(sql);
        console.log(`user inserted`);
        callback(null, [{"ID":res.rows[0].ID,"Fname": Fname,"Lname":Lname,"Email":Email,"Cellphone":Cellphone,"Username":Username,"Password": hashedPassword,"NewsLetter":NewsLetter, "Salt": Salt }]); 
    } 
    catch (error) {
        callback(null,error);
        }
    }
  
async function insertTicket(callback){

}

async function addComplaint(fullName,Email,Overview,Paragraph,callback){
    const insertComplaint=`INSERT INTO "Complaints"("fullName","Email","Overview","Paragraph") 
    VALUES ('${fullName}','${Email}','${Overview}','${Paragraph}')`;
};

export {returnBookings,createTicketPassengerRelation,addComplaint,generateTextID,findUser,insertUser,findJourneyViaCities,checkBookingID};
