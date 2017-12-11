DROP TABLE IF EXISTS col_row CASCADE;

CREATE TABLE col_row (
  id                  BIGSERIAL       NOT NULL,
  col_id              BIGINT          NOT NULL,
  row_id              BIGINT          NOT NULL,
  value               NUMERIC(10, 4)  NOT NULL,
  --date_created        TIMESTAMP       NULL,
  --last_updated        TIMESTAMP       NULL,
  --version             BIGINT          NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_col_row_col_id
  ON col_row (col_id);

CREATE INDEX idx_col_row_row_id
  ON col_row (row_id);

-- foreign keys ---------------------------------------------------------------
ALTER TABLE col_row
  ADD CONSTRAINT fk_col_row_col FOREIGN KEY (col_id) REFERENCES col (id)
ON DELETE RESTRICT
ON UPDATE RESTRICT;

ALTER TABLE col_row
  ADD CONSTRAINT fk_col_row_row FOREIGN KEY (row_id) REFERENCES row (id)
ON DELETE RESTRICT
ON UPDATE RESTRICT;

