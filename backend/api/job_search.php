<?php
require_once 'Careerjet_API.php'; // Include the Careerjet API class

// Set CORS headers for both OPTIONS and POST requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow any origin (for development)
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow GET, POST, and OPTIONS
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header

// Handle OPTIONS request (pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read JSON input data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input parameters
    if (empty($data['location']) || empty($data['jobTitle'])) {
        echo json_encode([
            'error' => true,
            'message' => 'Missing required parameters: locale, jobTitle.'
        ]);
        exit;
    }

    // Initialize the Careerjet API with the specified locale
    $cjapi = new Careerjet_API('en_US');

    // Prepare search parameters
    $search_params = [
        'keywords' => $data['jobTitle'],
        'location' => $data['location'] ?? '', // Optional
        'affid'    => "6f1f388e66dbb6870be80b3c61c4dce8", // Affiliate ID
        'sort'     => $data['sort'] ?? 'relevance', // Optional, default to relevance
        'pagesize' => $data['pagesize'] ?? 10, // Optional, default to 10
        'page'     => $data['page'] ?? 1, // Optional, default to 1
    ];

    // Call the Careerjet API
    $result = $cjapi->search($search_params);

    // Check for errors in the API response
    if ($result->type === 'ERROR') {
        echo json_encode([
            'error' => true,
            'message' => $result->error
        ]);
        exit;
    }

    // Prepare response data
    $response = [
        'success' => true,
        'hits' => $result->hits,
        'jobs' => $result->jobs, // Job results
        'pages' => $result->pages, // Total pages
    ];

    // Send response
    echo json_encode($response);
    exit;
}

// Default error response if method is not allowed
echo json_encode(['error' => 'Invalid request method']);
?>
