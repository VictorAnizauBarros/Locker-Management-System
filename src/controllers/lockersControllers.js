const prisma = require("@prisma/client").PrismaClient;
const prismaClient = new prisma();

exports.getLockers = async (req,res) => {
    try {
        const lockers = await prismaClient.locker.findMany();
        res.render("lockers", { lockers });
      } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar os armários.");
      }
    
}

exports.postLockers = async (req, res) => {
    const { id } = req.body;
    try {
      const locker = await prismaClient.locker.update({
        where: { id: parseInt(id) },
        data: { status: "reserved" },
      });
      res.json({ success: true, locker });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Erro ao alugar o armário." });
    }
  }