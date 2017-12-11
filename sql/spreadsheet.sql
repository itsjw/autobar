DROP TABLE IF EXISTS spreadsheet CASCADE;

CREATE TABLE spreadsheet (
  id                  BIGSERIAL     NOT NULL,
  name                VARCHAR(32)   NOT NULL,
  description         VARCHAR(256)  NOT NULL,
  --date_created        TIMESTAMP     NULL,
  --last_updated        TIMESTAMP     NULL,
  --version             BIGINT        NOT NULL,
  PRIMARY KEY (id)
);

-- indexes ---------------------------------------------------------------
CREATE UNIQUE INDEX uidx_spreadsheet_name
  ON spreadsheet (name);

