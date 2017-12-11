DROP TABLE IF EXISTS row CASCADE;

CREATE TABLE row (
  id                  BIGSERIAL     NOT NULL,
  spreadsheet_id      BIGINT        NOT NULL,
  name                VARCHAR(32)   NOT NULL,
  description         VARCHAR(256)  NOT NULL,
  sortOrder           BIGINT        NOT NULL,
  --date_created        TIMESTAMP     NULL,
  --last_updated        TIMESTAMP     NULL,
  --version             BIGINT        NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_row_spreadsheet_id
  ON row (spreadsheet_id);

CREATE INDEX idx_row_name_id
  ON row (name);

-- foreign keys ---------------------------------------------------------------
ALTER TABLE row
  ADD CONSTRAINT fk_row_spreadsheet FOREIGN KEY (spreadsheet_id) REFERENCES spreadsheet (id)
ON DELETE RESTRICT
ON UPDATE RESTRICT;

