CREATE TABLE personality_sector_mapping (
  id INT PRIMARY KEY AUTO_INCREMENT,
  personality_type VARCHAR(20) NOT NULL,
  sector_name VARCHAR(100) NOT NULL
);
INSERT INTO personality_sector_mapping (personality_type, sector_name)
VALUES
  ('INTJ', 'Accounting / Finance Jobs'),
  ('INTJ', 'Computers / Telecommunication Jobs'),
  ('INTJ', 'Design Jobs'),
  ('INTP', 'Computers / Telecommunication Jobs'),
  ('INFJ', 'Design Jobs'),
  ('INFJ', 'QA / Research Jobs'),
  ('INFP', 'Design Jobs'),
  ('INFP', 'QA / Research Jobs'),
  ('ISTJ', 'Accounting / Finance Jobs'),
  ('ISTJ', 'Administrative / Clerical Jobs'),
  ('ISTJ', 'Computers / Telecommunication Jobs'),
  ('ISTJ', 'Design Jobs'),
  ('ISTP', 'Accounting / Finance Jobs'),
  ('ISTP', 'Administrative / Clerical Jobs'),
  ('ISTP', 'Computers / Telecommunication Jobs'),
  ('ISTP', 'Design Jobs'),
  ('ISFJ', 'Administrative / Clerical Jobs'),
  ('ISFJ', 'QA / Research Jobs'),
  ('ISFP', 'Teaching Jobs'),
  ('ISFP', 'Administrative / Clerical Jobs'),
  ('ENTJ', 'Accounting / Finance Jobs'),
  ('ENTJ', 'Computers / Telecommunication Jobs'),
  ('ENTP', 'Computers / Telecommunication Jobs'),
  ('ENTP', 'QA / Research Jobs'),
  ('ENFJ', 'Teaching Jobs'),
  ('ENFJ', 'QA / Research Jobs'),
  ('ENFP', 'Design Jobs'),
  ('ENFP', 'QA / Research Jobs'),
  ('ESTJ', 'Accounting / Finance Jobs'),
  ('ESTJ', 'Administrative / Clerical Jobs'),
  ('ESTJ', 'Computers / Telecommunication Jobs'),
  ('ESTP', 'Accounting / Finance Jobs'),
  ('ESTP', 'Administrative / Clerical Jobs'),
  ('ESTP', 'Computers / Telecommunication Jobs'),
  ('ESTP', 'Design Jobs'),
  ('ESFJ', 'Administrative / Clerical Jobs'),
  ('ESFJ', 'QA / Research Jobs'),
  ('ESFP', 'Administrative / Clerical Jobs'),
  ('ESFP', 'QA / Research Jobs');
