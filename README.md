# 🎓 School Vaccination Portal

A web-based application to manage school vaccination drives, track student vaccination records, and ensure timely immunization.

---

## 🚀 Features

- Add and view vaccination drives
- Track student vaccination records
- Filter upcoming drives
- Built using Node.js, Express, PostgreSQL

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Tools:** Postman, Git, VSCode

---

## 📦 Setup Instructions

```bash
# Clone the repository
git clone git@github.com:Vikas9889/school_vaccination_backend.git
cd school_vaccination_backend
npm install

# Start the server
node app.js
# or for development with auto-reload
npm run dev
```

Make sure PostgreSQL is running and the DB is configured properly in `config/db.js`.

---

## 📬 API Endpoints

### Drive Endpoints
| Method | Endpoint                                         | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| GET    | /api/drives                                     | Get all drives                     |
| GET    | /api/drives/:id                                 | Get drive by ID                    |
| POST   | /api/drives                                     | Create new drive                   |
| PUT    | /api/drives/:id                                 | Update existing drive              |
| GET    | /api/drives/upcoming                            | Get upcoming drives (next 30 days) |
| GET    | /api/drives/dashboard                           | Dashboard overview (aggregate)     |
| GET    | /api/drives/v1/vaccination-drives               | Get all drives (alias)             |
| POST   | /api/drives/v1/vaccination-drives               | Create new drive (alias)           |
| GET    | /api/drives/v1/vaccination-reports              | Generate summary report (alias)    |

### Student Endpoints
| Method | Endpoint                                         | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| POST   | /api/v1/students                                 | Add a new student                  |
| GET    | /api/v1/students                                 | Get all students                   |
| GET    | /api/v1/students/:id                             | Get a student by ID                |
| PUT    | /api/v1/students/:id                             | Update a student by ID             |
| DELETE | /api/v1/students/:id                             | Delete a student by ID             |

### Vaccination Record Endpoints
| Method | Endpoint                                         | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| GET    | /api/v1/students/:id/vaccination-records         | Get vaccination records for student|
| POST   | /api/v1/students/vaccination-records             | Add or update vaccination record   |

---

## 📝 Example JSON Bodies

### Create Student
```json
{
  "name": "John Doe",
  "className": "Class 10",
  "studentId": "S12345"
}
```

### Create Vaccination Drive
```json
{
  "vaccineName": "HPV",
  "date": "2025-06-01",
  "dosesAvailable": 100,
  "applicableClasses": "Class 9, Class 10"
}
```

### Add/Update Vaccination Record
```json
{
  "studentId": 1,
  "driveId": 2,
  "vaccinatedAt": "2025-05-10T10:00:00.000Z"
}
```

---

✍️ Author
Vikas Gupta

⭐️ Star the Repo
If you like the project, consider starring it ⭐️ to show your support!












