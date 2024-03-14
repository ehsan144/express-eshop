/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product services

 * @swagger
 * /api/product/:
 *   get:
 *     summary: Get all Products
 *     tags : [Product]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Auth"
 */