const pool = require('./db'); // Your db connection file

async function recreateUsersTable() {
  try {
    console.log("Dropping existing tables...");

    // Drop existing tables (in correct order)
    await pool.query(`DROP TABLE IF EXISTS password_reset_otps`);
    await pool.query(`DROP TABLE IF EXISTS course_highlights`);
    await pool.query(`DROP TABLE IF EXISTS course_objectives`);
    await pool.query(`DROP TABLE IF EXISTS programs`);
    await pool.query(`DROP TABLE IF EXISTS contacts`);
    await pool.query(`DROP TABLE IF EXISTS users`);

    console.log("Creating tables...");


    //USER TABLE NEW
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100),
        student_id VARCHAR(50),
        age INT,
        grade VARCHAR(20),
        email VARCHAR(100) UNIQUE,
        parent_phone VARCHAR(20),
        password_hash TEXT,
        role TEXT,
        access SMALLINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // CREATE TRIGGER FUNCTION FOR AUTO-UPDATE
    await pool.query(`
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
  END;
  $$ language 'plpgsql';
`);

    // CREATE TRIGGER
    await pool.query(`
  CREATE TRIGGER update_users_updated_at 
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
`);

    // INSERT DEFAULT ADMIN USER
    await pool.query(`
      INSERT INTO users (
        full_name,
        student_id,
        age,
        grade,
        email,
        parent_phone,
        password_hash,
        role,
        access,
        created_at,
        updated_at
      ) VALUES (
        'santhosh',
        '102010',
        7,
        '3rd',
        'santhosh@redantlabs.io',
        '09345353384',
        '$2b$10$lFMojqc/l8cvYoOVtRRBnO8GBzGQeuXcwAC/m2sHsOY2yo8Hwp4P.',
        'admin',
        1,
        '2025-10-30 10:33:19.881218',
        '2025-10-30 10:33:19.881218'
      );
    `);

    console.log('✅ Users table created with default admin user');


    // CONTACTS TABLE
    await pool.query(`
      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(150),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // PROGRAMS TABLE
    await pool.query(`
      CREATE TABLE programs (
        id SERIAL PRIMARY KEY,
        days VARCHAR(255),
        duration VARCHAR(255),
        time VARCHAR(255),
        venue TEXT,
        materials TEXT,
        mentors TEXT,
        batch_size TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // COURSE OBJECTIVES TABLE
    await pool.query(`
      CREATE TABLE course_objectives (
        id SERIAL PRIMARY KEY,
        course_id INT NOT NULL,
        objective TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);

    // COURSE HIGHLIGHTS TABLE
    await pool.query(`
      CREATE TABLE course_highlights (
        id INT SERIAL PRIMARY KEY,
        course_id INT NOT NULL,
        highlight TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )
    `);

    // PASSWORD RESET OTP TABLE
    await pool.query(`
      CREATE TABLE password_reset_otps (
        id SERIAL PRIMARY KEY,
        user_id INT,
        otp VARCHAR(6),
        expires_at TIMESTAMP,
        used BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Managing Content
    //Home Page Tables -> Start
    //Logo
    await pool.query(`
      CREATE TABLE logo (
        id SERIAL PRIMARY KEY,
        logo_url TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    //Navbar Menus
    await pool.query(`
      CREATE TABLE navbar_items (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        href TEXT NOT NULL,
        visible BOOLEAN DEFAULT TRUE,
        order_index INT DEFAULT 0
      );
    `)

    //Banner Sections
    await pool.query(`
      CREATE TABLE banners (
      id SERIAL PRIMARY KEY,
      banner_title1 TEXT,
      banner_title2 TEXT,
      paragraph TEXT,
      button_name TEXT,
      button_link TEXT,
      image TEXT,
      b_image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)

    //STEPS Robotics
    await pool.query(`
      CREATE TABLE steps_robotics (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          image VARCHAR(500),
          video VARCHAR(500),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `)

    //Explore Courses
    await pool.query(`
      CREATE TABLE explore_courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image VARCHAR(500),
      button_text VARCHAR(100),
      button_link VARCHAR(500),
      list_items TEXT[], -- stores an array of strings like ['Item 1', 'Item 2']
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      );  
    `)

    //Explore Choose STEPS Robotics
    await pool.query(`
        CREATE TABLE why_choose_robotics (
        id SERIAL PRIMARY KEY,
        section_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)

    // Testmonials
    await pool.query(`
      CREATE TABLE testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        quote TEXT NOT NULL,
        description TEXT NOT NULL,
        rating FLOAT DEFAULT 0,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `)

    //Study Progress Gallery
    await pool.query(`
      CREATE TABLE study_gallery (
        id SERIAL PRIMARY KEY,
        image TEXT NOT NULL,
        alt TEXT
      );
    `)

    //Why Choose for Steps robotics for your child
    await pool.query(`
        CREATE TABLE why_choose_steps_main (
        id SERIAL PRIMARY KEY,
        robot_image TEXT NOT NULL,
        title TEXT
      );
      `)

    await pool.query(`
        CREATE TABLE why_choose_steps_items (
        id SERIAL PRIMARY KEY,
        icon TEXT NOT NULL,
        heading TEXT NOT NULL,
        description TEXT,
        side TEXT CHECK (side IN ('left', 'right')),
        order_index INT DEFAULT 0
      );
    `)

    // Footer
    await pool.query(`
        CREATE TABLE footer_info (
          id SERIAL PRIMARY KEY,
          logo_url TEXT,
          address TEXT,
          mobile TEXT,
          email TEXT,
          talk_image TEXT,
          facebook TEXT,
          twitter TEXT,
          instagram TEXT,
          youtube TEXT,
          linkedin TEXT
        );

    `)

    // FOOTER SUBSCRIBERS TABLE
    await pool.query(`
      CREATE TABLE subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ All tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await pool.end();
    console.log("Database connection closed.");
  }
}

recreateUsersTable();
