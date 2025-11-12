<?php
/**
 * Database Configuration and Connection Handler
 * Provides PDO connection with prepared statement support
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'cse_portal_database';
    private $username = 'root';
    private $password = '';
    private $conn;

    /**
     * Establish database connection
     * @return PDO|null
     */
    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
            $this->conn->exec("set names utf8mb4");
        } catch(PDOException $e) {
            error_log("Connection Error: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }

        return $this->conn;
    }

    /**
     * Execute SELECT query and return single row
     * @param string $query SQL query with placeholders
     * @param string $types Type string (s=string, i=integer, d=double)
     * @param array $params Parameters to bind
     * @return array|array{error: string}
     */
    public function getRow($query, $types = '', $params = []) {
        try {
            if ($this->conn === null) {
                $this->connect();
            }

            $stmt = $this->conn->prepare($query);
            
            if (!empty($params)) {
                $stmt->execute($params);
            } else {
                $stmt->execute();
            }

            $result = $stmt->fetch();
            return $result ? $result : null;
        } catch (PDOException $e) {
            error_log("Query Error: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Execute SELECT query and return all rows
     * @param string $query SQL query with placeholders
     * @param string $types Type string (s=string, i=integer, d=double)
     * @param array $params Parameters to bind
     * @return array|array{error: string}
     */
    public function getRows($query, $types = '', $params = []) {
        try {
            if ($this->conn === null) {
                $this->connect();
            }

            $stmt = $this->conn->prepare($query);
            
            if (!empty($params)) {
                $stmt->execute($params);
            } else {
                $stmt->execute();
            }

            $result = $stmt->fetchAll();
            return $result ? $result : [];
        } catch (PDOException $e) {
            error_log("Query Error: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Execute INSERT/UPDATE/DELETE query
     * @param string $query SQL query with placeholders
     * @param string $types Type string (s=string, i=integer, d=double)
     * @param array $params Parameters to bind
     * @return array Success status with message or error
     */
    public function executeQuery($query, $types = '', $params = []) {
        try {
            if ($this->conn === null) {
                $this->connect();
            }

            $stmt = $this->conn->prepare($query);
            
            if (!empty($params)) {
                $stmt->execute($params);
            } else {
                $stmt->execute();
            }

            return [
                'success' => true,
                'affected_rows' => $stmt->rowCount(),
                'last_insert_id' => $this->conn->lastInsertId()
            ];
        } catch (PDOException $e) {
            error_log("Execute Error: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get last insert ID
     * @return string
     */
    public function getLastInsertId() {
        return $this->conn->lastInsertId();
    }

    /**
     * Execute a general query (alias for executeQuery for compatibility)
     * @param string $query SQL query with placeholders
     * @param string $types Type string (s=string, i=integer, d=double)
     * @param array $params Parameters to bind
     * @return array Success status with message or error
     */
    public function query($query, $types = '', $params = []) {
        return $this->executeQuery($query, $types, $params);
    }

    /**
     * Begin transaction
     */
    public function beginTransaction() {
        if ($this->conn === null) {
            $this->connect();
        }
        return $this->conn->beginTransaction();
    }

    /**
     * Commit transaction
     */
    public function commit() {
        return $this->conn->commit();
    }

    /**
     * Rollback transaction
     */
    public function rollback() {
        return $this->conn->rollBack();
    }

    /**
     * Close connection
     */
    public function close() {
        $this->conn = null;
    }
}

/**
 * Helper function to get database connection
 * @return PDO
 */
function getDBConnection() {
    $db = new Database();
    return $db->connect();
}
?>
