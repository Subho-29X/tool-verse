<dependency>
    <groupId>net.sourceforge.tess4j</groupId>
    <artifactId>tess4j</artifactId>
    <version>5.16.0</version>
</dependency>



package com.axess.training;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class OcrService {

    public String extractText() throws Exception {

        // Test PDF location
        Path pdfPath = Paths.get("test-files", "testOCR.pdf");

        StringBuilder result = new StringBuilder();

        try (PDDocument document = Loader.loadPDF(pdfPath.toFile())) {

            PDFRenderer renderer = new PDFRenderer(document);

            // Create Tesseract
            ITesseract tesseract = new Tesseract();

            // Tesseract tessdata folder
            tesseract.setDatapath(
                    "C:/Program Files/Tesseract-OCR/tessdata"
            );

            // English language
            tesseract.setLanguage("eng");

            // OCR every page
            for (int page = 0;
                 page < document.getNumberOfPages();
                 page++) {

                BufferedImage image =
                        renderer.renderImageWithDPI(page, 300);

                String text = tesseract.doOCR(image);

                result.append(text);
                result.append("\n");
            }
        }

        return result.toString();
    }
}







package com.axess.training;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @GetMapping
    public String extractText() throws Exception {
        return ocrService.extractText();
    }
}

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping
    public String extractText(
            @RequestParam("file") MultipartFile file) throws Exception {

        return ocrService.extractText(file);
    }
}



@Service
public class OcrService {

    public String extractText(MultipartFile file) throws Exception {

        Path tempFile = Files.createTempFile("upload-", ".pdf");
        file.transferTo(tempFile.toFile());

        StringBuilder result = new StringBuilder();

        try (PDDocument document = Loader.loadPDF(tempFile.toFile())) {

            PDFRenderer renderer = new PDFRenderer(document);

            ITesseract tesseract = new Tesseract();

            // Tesseract installation directory
            tesseract.setDatapath(
                "C:/Program Files/Tesseract-OCR/tessdata"
            );

            tesseract.setLanguage("eng");

            for (int page = 0; page < document.getNumberOfPages(); page++) {

                BufferedImage image =
                    renderer.renderImageWithDPI(page, 300);

                String text = tesseract.doOCR(image);

                result.append(text).append("\n");
            }
        }

        Files.deleteIfExists(tempFile);

        return result.toString();
    }
}






import React, { useState } from "react";
import "./Login.css";
// Make sure this file exists in your src/ folder (or update path accordingly)
import scLogo from "./sc-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  };

  return (
    <div className="sc-login-container">
      {/* Left Visual Hero Section */}
      <div className="sc-hero-panel">
        <div className="sc-hero-overlay"></div>
        <div className="sc-hero-content">
          <div className="sc-accent-bar">
            <span className="bar-blue"></span>
            <span className="bar-green"></span>
          </div>
          <span className="sc-badge">Digital Banking Portal</span>
          <h1>Insights for today’s multipolar world</h1>
          <p>
            Secure, intelligent banking designed to help you navigate global
            markets and manage your portfolio seamlessly.
          </p>
          <div className="sc-trust-footer">
            <span>Enterprise-grade 256-bit encryption</span>
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="sc-form-panel">
        <div className="sc-form-wrapper">
          {/* Brand Header with Exact Logo Image */}
          <div className="sc-brand-header">
            <img
              src={scLogo}
              alt="Standard Chartered"
              className="sc-brand-image"
            />
            <div className="sc-brand-title">
              <h2>standard</h2>
              <h2>chartered</h2>
            </div>
          </div>

          <div className="sc-welcome-text">
            <h3>Welcome back</h3>
            <p>Please enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="sc-form">
            <div className="input-group">
              <label htmlFor="username">Username / ID</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="e.g. yourname@domain.com"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sc-form-options">
              <a href="#forgot" className="sc-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="sc-submit-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


. users
Column	Type	Notes
user_id	PK, INT/UUID	
name	VARCHAR	
email	VARCHAR, UNIQUE	login
password_hash	VARCHAR	
role	ENUM('CUSTOMER','MAKER','CHECKER','ADMIN')	drives queue visibility
created_at	TIMESTAMP	
is_active	BOOLEAN	
2. loan_applications
Column	Type	Notes
loan_application_id	PK, INT/UUID	internal id
transaction_ref_no	VARCHAR, UNIQUE	e.g. SCW157SG10A1060519074552 — business identifier, from User Story 2
customer_id	FK → users.user_id	who submitted
customer_name	VARCHAR	captured at submission (denormalized snapshot)
customer_country	VARCHAR	
address	VARCHAR	
date_of_birth	DATE	
loan_amount	DECIMAL	entered by Maker (per mockup)
currency	VARCHAR(3)	
status	ENUM('SUBMITTED','IN_MAKER','IN_CHECKER','APPROVED','TP_SYNC_PENDING','TP_CONFIRMED','REJECTED')	overall app state
current_work_item_id	FK → work_items.work_item_id, NULLABLE	pointer to active step
tp_system_ref	VARCHAR, NULLABLE	confirmation id once created in TP System
created_at	TIMESTAMP	
updated_at	TIMESTAMP	
3. loan_documents
Column	Type	Notes
document_id	PK	
loan_application_id	FK → loan_applications	
file_name	VARCHAR	
file_path / blob_ref	VARCHAR	storage location
file_type	VARCHAR	pdf/jpg/png etc.
uploaded_by	FK → users.user_id	
uploaded_at	TIMESTAMP	
4. workflow_steps (new — lookup/config table)
Column	Type	Notes
step_id	PK	e.g. 1–6
step_name	VARCHAR	'Loan Form', 'Operations Maker', 'Operations Checker', 'System Approval'
step_type	ENUM('M','A')	Manual or Auto
assigned_role	ENUM('CUSTOMER','MAKER','CHECKER', NULL)	NULL for auto/system steps
next_step_id	FK → workflow_steps.step_id, NULLABLE	drives the handoff chain (User Stories 4 & 6)
sort_order	INT	
5. work_items
Column	Type	Notes
work_item_id	PK	
loan_application_id	FK → loan_applications	
step_id	FK → workflow_steps.step_id	current step (replaces free-text step name)
assigned_group	ENUM('MAKER','CHECKER','SYSTEM')	which queue it sits in
assigned_user_id	FK → users.user_id, NULLABLE	who picked it up (NULL = unclaimed, sitting in shared inbox)
status	ENUM('PENDING','IN_PROGRESS','COMPLETED')	
picked_at	TIMESTAMP, NULLABLE	
completed_at	TIMESTAMP, NULLABLE	
created_at	TIMESTAMP	
6. workflow_history (audit trail — system-generated, immutable)
Column	Type	Notes
history_id	PK	
loan_application_id	FK → loan_applications	
work_item_id	FK → work_items	
from_step_id	FK → workflow_steps, NULLABLE	
to_step_id	FK → workflow_steps	
action	VARCHAR	'SUBMITTED','PICKED','COMPLETED','APPROVED','MOVED_TO_TP'
performed_by	FK → users.user_id, NULLABLE	NULL for system-auto actions
performed_at	TIMESTAMP	
7. comments (new — from the mockup's Comments tab)
Column	Type	Notes
comment_id	PK	
work_item_id	FK → work_items	
user_id	FK → users.user_id	author
comment_text	TEXT	
created_at	TIMESTAMP	
Key relationships to note:
loan_applications 1—N work_items (one row per step the loan passes through)
work_items 1—N comments, 1—N workflow_history entries
workflow_steps is the config table both work_items.step_id and loan_applications status logic reference — this is what lets your workflow engine be data-driven instead of hardcoded if/else per step.
That's 7 tables total (5 original + comments + workflow_steps). If you want to keep workflow_steps out of MVP scope and just hardcode the 3 states in code, you can drop it and keep work_items.step_name as a plain string — just flag that as a deliberate scope cut, not an oversight.


