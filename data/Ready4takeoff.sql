SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public."Airport" (
    "airportID" text NOT NULL,
    "City" text NOT NULL,
    "Country" text NOT NULL,
    "airportName" text NOT NULL
);


ALTER TABLE public."Airport" OWNER TO postgres;



CREATE TABLE public."Anent" (
    "bookingID" text NOT NULL,
    "ticketID" text NOT NULL
);


ALTER TABLE public."Anent" OWNER TO postgres;



CREATE TABLE public."Booking" (
    "BookingID" text NOT NULL,
    "Date" date NOT NULL,
    "Time" time with time zone NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;


CREATE TABLE public."Passenger"(
    "passengerID" integer NOT NULL,
    "Fname" text NOT NULL,
    "Lname" text NOT NULL,
    "Email" text NOT NULL,
    "Cellphone" text NOT NULL,
    "Gender" text NOT NULL,
    "ID_TYPE" text NOT NULL
);

CREATE TABLE public."Complaints" (
    "complaintID" integer NOT NULL,
    "fullName" text NOT NULL,
    "Email" text NOT NULL,
    "Overview" text NOT NULL,
    "Paragraph" text NOT NULL
);


CREATE TABLE public."Consists" (
    "journeyID" text NOT NULL,
    "flightID" text NOT NULL
);


ALTER TABLE public."Consists" OWNER TO postgres;



CREATE TABLE public."Customer" (
    "customerID" int NOT NULL,
    "Country" text NOT NULL,
    "City" text NOT NULL,
    "Postcode" text NOT NULL,
    "Address" text NOT NULL,
    "Gender" text
);


ALTER TABLE public."Customer" OWNER TO postgres;



CREATE TABLE public."Finishes" (
    "flightID" text NOT NULL,
    "airportID" text NOT NULL,
    "departureDate" date NOT NULL,
    "departureTime" time with time zone NOT NULL,
    "departureGate" text NOT NULL
);


ALTER TABLE public."Finishes" OWNER TO postgres;








CREATE TABLE public."FlightLeg" (
    "flightID" text NOT NULL,
    "startAirportID" text NOT NULL,
    "finishAirportID" text NOT NULL,
    "Frequency" integer NOT NULL,
    "weekDays" text NOT NULL,
    "estimatedTime" time without time zone NOT NULL,
    "Miles" double precision DEFAULT 0.0 NOT NULL,
    "Company" text NOT NULL, 
    "departureDate" date NOT NULL, 
    "departureTime"time with time zone NOT NULL NOT NULL, 
    "departureGate" text NOT NULL, 
    "arrivalDate" date NOT NULL, 
    "arrivalTime" time with time zone NOT NULL, 
    "arrivalGate" text NOT NULL
);


ALTER TABLE public."FlightLeg" OWNER TO postgres;



CREATE TABLE public."Journey" (
    "journeyID" text NOT NULL
);


ALTER TABLE public."Journey" OWNER TO postgres;


CREATE TABLE public."Relates" (
    "ticketID" text NOT NULL,
    "journeyID" text NOT NULL
);


ALTER TABLE public."Relates" OWNER TO postgres;


CREATE TABLE public."Reserves" (
    "customerID" INT NOT NULL,
    "bookingID" text NOT NULL
);


ALTER TABLE public."Reserves" OWNER TO postgres;



CREATE TABLE public."Starts" (
    "flightID" text NOT NULL,
    "airportID" text NOT NULL,
    "departureDate" date NOT NULL,
    "departureTime" time with time zone NOT NULL,
    "departureGate" text NOT NULL
);


ALTER TABLE public."Starts" OWNER TO postgres;



CREATE TABLE public."Ticket" (
    "ticketID" text NOT NULL,
    "NVA" date NOT NULL,
    "NVB" date NOT NULL,
    "Company" text NOT NULL,
    "ticketType" text NOT NULL,
    "Cost" double precision DEFAULT 0.0 NOT NULL,
    "purchaseDate" date NOT NULL,
    "Return" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Ticket" OWNER TO postgres;


CREATE TABLE public."User" (
    "ID" INT NOT NULL,
    "Fname" text NOT NULL,
    "Lname" text NOT NULL,
    "Cellphone" text NOT NULL,
    "Email" text NOT NULL,
    "Username" text NOT NULL,
    "Password" text NOT NULL,
    "NewsLetter" BOOLEAN,
    "Salt" text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

ALTER TABLE ONLY public."Passenger"
    ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY ("passengerID");



ALTER TABLE ONLY public."Airport"
    ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("airportID");




ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("BookingID");




ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID");



ALTER TABLE ONLY public."FlightLeg"
    ADD CONSTRAINT "FlightLeg_pkey" PRIMARY KEY ("flightID");




ALTER TABLE ONLY public."Journey"
    ADD CONSTRAINT "Journey_pkey" PRIMARY KEY ("journeyID");



ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID");


ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("ID");


ALTER TABLE ONLY public."Complaints"
    ADD CONSTRAINT "complaintID" PRIMARY KEY ("complaintID");

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "CustomerID" FOREIGN KEY ("customerID") REFERENCES public."User"("ID");




ALTER TABLE ONLY public."Starts"
    ADD CONSTRAINT "airportID" FOREIGN KEY ("airportID") REFERENCES public."Airport"("airportID");




ALTER TABLE ONLY public."Finishes"
    ADD CONSTRAINT "airportID" FOREIGN KEY ("airportID") REFERENCES public."Airport"("airportID");




ALTER TABLE ONLY public."Reserves"
    ADD CONSTRAINT "bookingID" FOREIGN KEY ("bookingID") REFERENCES public."Booking"("BookingID");




ALTER TABLE ONLY public."Anent"
    ADD CONSTRAINT "bookingID" FOREIGN KEY ("bookingID") REFERENCES public."Booking"("BookingID");



ALTER TABLE ONLY public."Reserves"
    ADD CONSTRAINT "customerID" FOREIGN KEY ("customerID") REFERENCES public."Customer"("customerID");




ALTER TABLE ONLY public."Consists"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");




ALTER TABLE ONLY public."Starts"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");




ALTER TABLE ONLY public."Finishes"
    ADD CONSTRAINT "flightID" FOREIGN KEY ("flightID") REFERENCES public."FlightLeg"("flightID");




ALTER TABLE ONLY public."Relates"
    ADD CONSTRAINT "journeyID" FOREIGN KEY ("journeyID") REFERENCES public."Journey"("journeyID");




ALTER TABLE ONLY public."Consists"
    ADD CONSTRAINT "journeyID" FOREIGN KEY ("journeyID") REFERENCES public."Journey"("journeyID");



ALTER TABLE ONLY public."Anent"
    ADD CONSTRAINT "ticketID" FOREIGN KEY ("ticketID") REFERENCES public."Ticket"("ticketID");


ALTER TABLE ONLY public."Relates"
    ADD CONSTRAINT "ticketID" FOREIGN KEY ("ticketID") REFERENCES public."Ticket"("ticketID");


ALTER TABLE public."User" ALTER COLUMN "ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_userID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE public."Complaints" ALTER COLUMN "complaintID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Complaintss_complaintID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE public."Passenger" ALTER COLUMN "passengerID" ADD GENERATED ALWAYS AS IDENTITY(
    SEQUENCE NAME public."Passenger_passengerID_seq"
    START WITH 2923758
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);