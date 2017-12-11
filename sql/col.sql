DROP TABLE IF EXISTS col CASCADE;

CREATE TABLE col (
  id                  BIGSERIAL     NOT NULL,
  name                VARCHAR(32)   NOT NULL,
  description         VARCHAR(256)  NOT NULL,
  sortOrder           BIGINT        NOT NULL,
  --date_created        TIMESTAMP     NULL,
  --last_updated        TIMESTAMP     NULL,
  --version             BIGINT        NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_col_name_id
  ON col (name);
