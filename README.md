# Gym Member Management System

A full-stack web application designed to streamline gym operations by providing administrators with tools to manage members, trainers, class schedules, memberships, and payments—all from a centralized dashboard.

## The Problem It Solves

Managing a gym involves juggling multiple responsibilities: tracking member information, coordinating trainer schedules, managing class timetables, processing payments, and analyzing business performance. Traditional methods using spreadsheets or paper-based systems are inefficient, error-prone, and don't scale well. This application digitizes and centralizes these operations, enabling gym administrators to:

- Quickly access and update member profiles
- Monitor membership status and payment history
- Coordinate class schedules with trainer availability
- Visualize business metrics through interactive charts
- Reduce administrative overhead and human error

## Key Features

### Customer Management
- **CRUD Operations**: Create, view, update, and delete customer profiles
- **Detailed Member Profiles**: Track contact information, addresses, and membership status
- **Smart Tables**: Searchable, sortable customer lists with pagination
- **Status Tracking**: Real-time indicators for active/inactive memberships

### Membership & Pricing
- **Dynamic Pricing Plans**: Manage multiple membership tiers (1-month, 3-month, 12-month plans)
- **Inline Editing**: Update membership prices directly from the pricing table
- **Popularity Metrics**: Track which membership plans are trending

### Trainer Management
- **Trainer Profiles**: Add trainers with specialties (Boxing, MMA, Dance, Fitness, etc.)
- **Workload Tracking**: Monitor weekly hours for each trainer
- **Easy Assignment**: Connect trainers to specific classes

### Class Scheduling
- **Weekly Timetable View**: Visual grid showing all classes by day and time slot
- **Inline Editing**: Click to edit class details (trainer, type, time) directly in the schedule
- **Class Types**: Support for multiple program types (Workout, Team Programs, Martial Arts)

### Analytics Dashboard
- **Revenue Visualization**: Line and bar charts showing income trends over time
- **Key Metrics Cards**: At-a-glance stats for sales, revenue, and customer counts
- **Capacity Monitoring**: Pie charts displaying gym occupancy
- **Recent Transactions**: Live feed of latest member sign-ups and renewals

## Technical Stack

### Frontend
- **React 18.3** - Component-based UI architecture
- **Redux Toolkit** - Centralized state management with async thunks
- **React Router v6** - Client-side routing with protected routes
- **React Table v7** - Advanced table features (sorting, pagination, filtering)
- **Recharts** - Data visualization library for charts and graphs
- **Axios** - HTTP client for REST API communication
- **SCSS/Styled Components** - Modular styling approach
- **FontAwesome & React Icons** - Consistent iconography

### Backend
- **Spring Boot 3.3.6** - RESTful API framework
- **Java 17 LTS** - Programming language with long-term support
- **Spring Data JPA** - ORM for database operations
- **PostgreSQL** - Relational database
- **Maven** - Dependency management and build tool

### Architecture Patterns
- **MVC Pattern**: Clear separation between models, views, and controllers
- **Repository Pattern**: Data access abstraction layer
- **REST Architecture**: Stateless API with standard HTTP methods
- **Normalized Database**: Relational integrity with proper foreign keys

## React Concepts & Techniques Used

- **Hooks**:
  - `useState` - Managing local component state (forms, modals, edit modes)
  - `useEffect` - Data fetching, side effects, and lifecycle management
  - `useMemo` - Performance optimization for expensive calculations (table columns, filtered data)
  - `useRef` - Direct DOM access for input focus management
  - `useParams` - Extracting URL parameters for dynamic routes
  - `useNavigate` - Programmatic navigation
  - `useSelector` / `useDispatch` - Redux state access and action dispatching

- **Redux Toolkit Patterns**:
  - `createSlice` - Simplified reducer logic with Immer integration
  - `createAsyncThunk` - Handling async API calls with automatic loading states
  - `extraReducers` - Managing async action states (pending, fulfilled, rejected)

- **Advanced Patterns**:
  - **Higher-Order Component Pattern**: ProtectedRoutes wrapper for authentication
  - **Compound Components**: Modal system with flexible content
  - **Controlled Components**: Form inputs with validation
  - **Lazy Evaluation**: Conditional rendering based on state
  - **Render Props**: React Table's flexible rendering system

## Project Structure

```
Gym_Member_Management/
├── Clients/
│   └── gym-customer/
│       ├── src/
│       │   ├── Components/      # Reusable UI components
│       │   ├── Pages/           # Route-level page components
│       │   ├── ReduxFiles/      # State management (store, slices)
│       │   └── Services/        # API service layer
│       └── package.json
└── Server/
    └── GymCustomers/
        ├── src/main/java/       # Java source code
        │   ├── controller/      # REST endpoints
        │   ├── dto/             # Data Transfer Objects & Error responses
        │   ├── exception/       # Custom exceptions & GlobalExceptionHandler
        │   ├── model/           # JPA entities
        │   ├── repository/      # Data access layer
        │   └── service/         # Business logic layer
        │       └── impl/        # Service implementations
        ├── src/main/resources/  # Application properties
        ├── pom.xml              # Maven configuration
        └── mvnw.cmd             # Maven wrapper
```

## Installation & Setup

### Prerequisites
- **Node.js v22 LTS** (recommended) or v20 LTS minimum
- **Java 21 LTS** (Latest Long-Term Support version)
- **PostgreSQL v13+**
- **Maven 3.8+**

### Backend Setup
```bash
cd Server/GymCustomers
# Configure database in src/main/resources/application.properties
# Then build and run:
./mvnw clean install
./mvnw spring-boot:run

# On Windows, use:
# .\mvnw.cmd clean install
# .\mvnw.cmd spring-boot:run
```

### Frontend Setup
```bash
cd Clients/gym-customer
npm install
npm start
```

The application runs on:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## Known Issues & Improvement Opportunities

### Current Problems
1. **Authentication**: Login is session-based without proper JWT authentication
2. **Mock Data**: Dashboard uses hardcoded data instead of real API calls
3. **Limited Validation**: Form validation could be more comprehensive
4. **Error Handling**: Generic error messages without user-friendly feedback

### Todo Improvements
1. **Add Real Authentication**: Implement JWT-based auth with Spring Security
2. **Connect Dashboard**: Wire up dashboard charts to actual database queries
3. **Add Search & Filters**: Global search across customers, advanced filtering
4. **Export Functionality**: PDF/CSV export for reports and customer lists
5. **Email Notifications**: Automated reminders for membership expiration
6. **Mobile Responsiveness**: Optimize layouts for tablet/mobile devices
7. **Dark Mode**: Theme toggle for better UX
8. **Role-Based Access**: Different permissions for admins vs. staff
9. **Audit Logs**: Track who made what changes and when
10. **Payment Integration**: Connect to Stripe/PayPal for online payments if safe

### Todo Refactor
- Extract magic numbers to constants
- Add PropTypes or TypeScript for type safety
- Implement comprehensive error boundaries
- Add unit and integration tests
- Standardize API error responses for enterprise API
- Implement loading skeletons instead of generic loaders

## How can i impress you?

This isn't just a CRUD app—it demonstrates understanding of:
- **State Management Complexity**: Mixed use of local state and Redux for appropriate scenarios
- **Performance Optimization**: Memoization, pagination, and lazy loading
- **User Experience**: Inline editing, confirmation modals, intuitive navigation
- **Data Visualization**: Business intelligence through charts and metrics
- **Full-Stack Integration**: Clean API contracts between frontend and backend
- **Real-World Patterns**: Authentication guards, form validation, error handling
- **API Performance**: I want make APIS ready for enterprise scability
- **Microservices**: Separate project to different services later and change authentication to OATH2 for microservices.
---

**Built with attention to user experience and scalability in mind.**

