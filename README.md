#  CabPool - Campus Smart Ride

**Live cab-sharing platform built to help students instantly match routes and split fares.**

##  The Problem
Before every long weekend, students book cabs to the airport or train stations one by one. Meanwhile, WhatsApp groups are flooded with "anyone going to the airport at 6?" messages that quickly get lost. Sharing a cab costs less, but finding someone traveling on the exact same route is usually down to luck. 

##  The Solution: CabPool
I built CabPool to solve this exact problem. It is a smart web application that intelligently matches overlapping routes (for example, matching someone traveling from Urapakkam to VIT Chennai with someone heading down the same corridor). 

Instead of scrolling through group chats, students can instantly see available rides, split the fare dynamically, and travel together.

###  Key Features
* **Smart Corridor Matching:** Enter a starting point and destination. The app filters and finds trips leaving within a similar timeframe on overlapping routes.
* **Dynamic Fare Splitting:** Automatically calculates the estimated cost per person based on how many users have joined the ride.
* **Privacy-First Contacts:** The driver's contact number remains completely hidden until a user officially joins the trip.
* **Real-time Capacity Tracking:** Seats automatically update as users join or leave, preventing overbooking.

###  Tech Stack
* **Frontend:** React.js
* **Styling:** Tailwind CSS (v4) with custom gradient UI/UX
* **Icons:** Lucide React
* **Build Tool:** Vite (for lightning-fast hot module replacement)

##  How to Run Locally

If you'd like to check out the code and run it on your own machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/pkirthivasan-4373/cab_pool.git](https://github.com/pkirthivasan-4373/cab_pool.git)
