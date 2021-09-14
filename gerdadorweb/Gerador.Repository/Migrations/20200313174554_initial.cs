using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Gerador.Repository.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FullName = table.Column<string>(type: "varchar(150)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Configuracoes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Planta = table.Column<string>(maxLength: 45, nullable: false),
                    Linha = table.Column<string>(maxLength: 10, nullable: false),
                    PlantaReduzida = table.Column<string>(maxLength: 4, nullable: false),
                    Servidor = table.Column<string>(maxLength: 20, nullable: false),
                    DescLinha = table.Column<string>(maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuracoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TipoVariaveis",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoVariaveis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UMs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(maxLength: 45, nullable: false),
                    Sigla = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UMs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lmss",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AbrevMaquina = table.Column<string>(maxLength: 5, nullable: false),
                    NumMaquina = table.Column<string>(maxLength: 10, nullable: true),
                    TagOP = table.Column<string>(maxLength: 255, nullable: false),
                    SufixTag = table.Column<string>(maxLength: 50, nullable: false),
                    TagLMS = table.Column<string>(maxLength: 255, nullable: false),
                    ConfiguracaoId = table.Column<int>(nullable: false),
                    TipoVariavelId = table.Column<int>(nullable: false),
                    TipoVariavelIdFT = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lmss", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lmss_Configuracoes_ConfiguracaoId",
                        column: x => x.ConfiguracaoId,
                        principalTable: "Configuracoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lmss_TipoVariaveis_TipoVariavelId",
                        column: x => x.TipoVariavelId,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lmss_TipoVariaveis_TipoVariavelIdFT",
                        column: x => x.TipoVariavelIdFT,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plcs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PlcDesc = table.Column<string>(maxLength: 45, nullable: false),
                    IP = table.Column<string>(maxLength: 15, nullable: false),
                    EnderecoPLC = table.Column<string>(maxLength: 65, nullable: true),
                    CanalIGS = table.Column<string>(maxLength: 55, nullable: false),
                    DeviceIGS = table.Column<string>(maxLength: 45, nullable: false),
                    Pasta = table.Column<string>(maxLength: 5, nullable: false),
                    TagIGS = table.Column<string>(maxLength: 55, nullable: true),
                    EnderecoOPCFull = table.Column<string>(maxLength: 200, nullable: false),
                    ValidSmartTag = table.Column<string>(maxLength: 40, nullable: false),
                    AbrevPLC = table.Column<string>(maxLength: 5, nullable: true),
                    ConfiguracaoId = table.Column<int>(nullable: false),
                    TipoVariavelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plcs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plcs_Configuracoes_ConfiguracaoId",
                        column: x => x.ConfiguracaoId,
                        principalTable: "Configuracoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Plcs_TipoVariaveis_TipoVariavelId",
                        column: x => x.TipoVariavelId,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ambevs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CodPlanControl = table.Column<string>(maxLength: 5, nullable: true),
                    NomPlaniControl = table.Column<string>(maxLength: 50, nullable: true),
                    CodGrupoItemPlani = table.Column<string>(maxLength: 50, nullable: true),
                    NomGrupoItemPlani = table.Column<string>(maxLength: 50, nullable: true),
                    CodItemControle = table.Column<string>(maxLength: 50, nullable: true),
                    NomeItemControle = table.Column<string>(maxLength: 300, nullable: true),
                    CodItemPlanilha = table.Column<string>(maxLength: 50, nullable: true),
                    CCP_ICL = table.Column<string>(maxLength: 50, nullable: true),
                    Obrigatorio = table.Column<string>(maxLength: 4, nullable: true),
                    EspecifiHistorico = table.Column<string>(maxLength: 250, nullable: true),
                    RegraColetaAutoma = table.Column<string>(maxLength: 150, nullable: true),
                    ComentarioAmbev = table.Column<string>(maxLength: 400, nullable: true),
                    FrequenciaWorkf = table.Column<string>(maxLength: 350, nullable: true),
                    CondBasicaWorkFlo = table.Column<string>(maxLength: 100, nullable: true),
                    CondEspeciWorkFlo = table.Column<string>(maxLength: 150, nullable: true),
                    ValorColetadoWorFlo = table.Column<string>(maxLength: 10, nullable: true),
                    TipoLinha = table.Column<string>(nullable: true),
                    PProdMES = table.Column<string>(maxLength: 20, nullable: true),
                    UmId = table.Column<int>(nullable: false),
                    TipoVariavelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambevs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ambevs_TipoVariaveis_TipoVariavelId",
                        column: x => x.TipoVariavelId,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ambevs_UMs_UmId",
                        column: x => x.UmId,
                        principalTable: "UMs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IgSs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TagName = table.Column<string>(maxLength: 50, nullable: false),
                    Address = table.Column<string>(maxLength: 20, nullable: false),
                    ScanRate = table.Column<int>(nullable: false),
                    RespDataType = table.Column<int>(nullable: false),
                    FormTag = table.Column<string>(maxLength: 10, nullable: false),
                    ClientAccess = table.Column<string>(maxLength: 20, nullable: false),
                    TipoVariavelId = table.Column<int>(nullable: false),
                    TipoVariavelIdFT = table.Column<int>(nullable: false),
                    PLCId = table.Column<int>(nullable: false),
                    ConfiguracaoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IgSs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IgSs_Configuracoes_ConfiguracaoId",
                        column: x => x.ConfiguracaoId,
                        principalTable: "Configuracoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IgSs_Plcs_PLCId",
                        column: x => x.PLCId,
                        principalTable: "Plcs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IgSs_TipoVariaveis_TipoVariavelId",
                        column: x => x.TipoVariavelId,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IgSs_TipoVariaveis_TipoVariavelIdFT",
                        column: x => x.TipoVariavelIdFT,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Historians",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NivelInstru = table.Column<string>(maxLength: 55, nullable: false),
                    LInstalacao = table.Column<string>(maxLength: 100, nullable: false),
                    Local23NivelSAP = table.Column<string>(maxLength: 45, nullable: true),
                    Iniciativa = table.Column<string>(maxLength: 10, nullable: false),
                    TagHistorian = table.Column<string>(maxLength: 150, nullable: true),
                    Descricao = table.Column<string>(maxLength: 150, nullable: false),
                    ComentarioHistoria = table.Column<string>(maxLength: 255, nullable: false),
                    ValidTagHistorian = table.Column<string>(maxLength: 100, nullable: false),
                    Evidencia = table.Column<string>(maxLength: 100, nullable: true),
                    ComentaFinal = table.Column<string>(maxLength: 100, nullable: false),
                    CollectionType = table.Column<string>(maxLength: 150, nullable: false),
                    CollectionInterval = table.Column<int>(maxLength: 11, nullable: false),
                    CollectorCompression = table.Column<bool>(nullable: false),
                    CollectorCompressorTimeOut = table.Column<int>(nullable: false),
                    CollectDeadPercenRange = table.Column<int>(nullable: false),
                    AbrevMaquina = table.Column<string>(maxLength: 5, nullable: false),
                    NumMaquina = table.Column<string>(maxLength: 10, nullable: false),
                    PlcId = table.Column<int>(nullable: false),
                    ConfiguracaoId = table.Column<int>(nullable: false),
                    AmbevId = table.Column<int>(nullable: false),
                    UmId = table.Column<int>(nullable: false),
                    TipoVariavelId = table.Column<int>(nullable: false),
                    PProdMes = table.Column<string>(maxLength: 10, nullable: true),
                    CollectorName = table.Column<string>(maxLength: 150, nullable: false),
                    HiScale = table.Column<string>(maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Historians", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Historians_Ambevs_AmbevId",
                        column: x => x.AmbevId,
                        principalTable: "Ambevs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Historians_Configuracoes_ConfiguracaoId",
                        column: x => x.ConfiguracaoId,
                        principalTable: "Configuracoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Historians_Plcs_PlcId",
                        column: x => x.PlcId,
                        principalTable: "Plcs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Historians_TipoVariaveis_TipoVariavelId",
                        column: x => x.TipoVariavelId,
                        principalTable: "TipoVariaveis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Historians_UMs_UmId",
                        column: x => x.UmId,
                        principalTable: "UMs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TipoVariaveis",
                columns: new[] { "Id", "Descricao" },
                values: new object[,]
                {
                    { 1, "Boolean" },
                    { 20, "_S" },
                    { 21, "_SP_T1" },
                    { 22, "_SP_T2" },
                    { 23, "_SP_T3" },
                    { 24, "_SP_T4" },
                    { 25, "_Status" },
                    { 19, "_Q" },
                    { 26, "_T" },
                    { 28, "_ZA_CIK_TAL" },
                    { 30, "_P" },
                    { 31, "-" },
                    { 32, "" },
                    { 33, "Boolean ou Float" },
                    { 34, "Word" },
                    { 27, "_UP" },
                    { 18, "_OA" },
                    { 29, "_ZP_CIK_TAL" },
                    { 16, "_COD_FORMATO" },
                    { 17, "_KT" },
                    { 2, "SingleInteger" },
                    { 3, "Integer" },
                    { 5, "DINT" },
                    { 6, "SingleFloat" },
                    { 7, "Float" },
                    { 8, "Double" },
                    { 4, "DoubleInteger" },
                    { 10, "_L" },
                    { 11, "_AVO" },
                    { 12, "_CIK_C" },
                    { 13, "_CIK" },
                    { 14, "_CIK_L" },
                    { 9, "_A" },
                    { 15, "_CIK_Q" }
                });

            migrationBuilder.InsertData(
                table: "UMs",
                columns: new[] { "Id", "Descricao", "Sigla" },
                values: new object[,]
                {
                    { 36, "-", "-" },
                    { 35, "lt", "lt" },
                    { 34, "lt/h", "lt/h" },
                    { 33, "seg", "seg" },
                    { 30, "Garrafa/Hora", "grf/h" },
                    { 31, "Garrafa", "grf" },
                    { 29, "Decímetro", "dm" },
                    { 37, "1 / 0 ou %", "1 / 0 ou %" },
                    { 28, "Decilitro", "dL" },
                    { 32, "1 / 0", "1 / 0" },
                    { 38, "1 / 0 ou kgf/cm2", "1 / 0 ou kgf/cm2" },
                    { 46, "Unidade de Pasteurização", "Unidade de Pasteurização" },
                    { 40, "Kilograma Forca por cm2", "Kilograma Forca por cm2" },
                    { 41, "Kilowhat Hora", "kwh" },
                    { 42, "MICRO SIEMENS/CM", "MICRO SIEMENS/CM" },
                    { 43, "Oximetro", "Oximetro" },
                    { 44, "Partes por bilhão", "PPB" },
                    { 45, "Segundos", "s" },
                    { 47, "Lata", "Lata" },
                    { 48, "Lata por hora", "Lata por hora" },
                    { 49, "OK/NOK", "OK/NOK" },
                    { 27, "Decigrama", "dg" },
                    { 39, "kgf/cm2", "kgf/cm2" },
                    { 26, "Centilitro", "cL" },
                    { 9, "Ampère", "A" },
                    { 24, "Hora", "h" },
                    { 1, "Metro Cúbico", "m³" },
                    { 2, "Quilograma", "kg" },
                    { 3, "Percentual", "%" },
                    { 4, "Grau Celsius", "ºC" },
                    { 5, "-", "uS" },
                    { 6, "Potencial Hidrogeniônico", "pH" },
                    { 7, "BAR", "bar" },
                    { 8, "-", "ºBx" },
                    { 50, "UP", "UP" },
                    { 10, "Centímetro", "cm" },
                    { 11, "Centímetro quadrado", "cm²" },
                    { 12, "Centímetro cubico", "cm³" },
                    { 13, "Fahrenheit", "°F" },
                    { 14, "Hectograma", "hg" },
                    { 15, "Hectolitro", "hL" },
                    { 16, "Joule", "J" },
                    { 17, "Quilo-hertz", "kHz" },
                    { 18, "Minuto", "min" },
                    { 19, "Militro", "mL" },
                    { 20, "Milimetro", "mm" },
                    { 21, "Milimetro quadrado", "mm²" },
                    { 22, "Milimetro Cúbico", "mm³" },
                    { 23, "grama", "g" },
                    { 25, "Centigrama", "cg" },
                    { 51, "?", "?" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ambevs_TipoVariavelId",
                table: "Ambevs",
                column: "TipoVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_Ambevs_UmId",
                table: "Ambevs",
                column: "UmId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Historians_AmbevId",
                table: "Historians",
                column: "AmbevId");

            migrationBuilder.CreateIndex(
                name: "IX_Historians_ConfiguracaoId",
                table: "Historians",
                column: "ConfiguracaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Historians_PlcId",
                table: "Historians",
                column: "PlcId");

            migrationBuilder.CreateIndex(
                name: "IX_Historians_TipoVariavelId",
                table: "Historians",
                column: "TipoVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_Historians_UmId",
                table: "Historians",
                column: "UmId");

            migrationBuilder.CreateIndex(
                name: "IX_IgSs_ConfiguracaoId",
                table: "IgSs",
                column: "ConfiguracaoId");

            migrationBuilder.CreateIndex(
                name: "IX_IgSs_PLCId",
                table: "IgSs",
                column: "PLCId");

            migrationBuilder.CreateIndex(
                name: "IX_IgSs_TipoVariavelId",
                table: "IgSs",
                column: "TipoVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_IgSs_TipoVariavelIdFT",
                table: "IgSs",
                column: "TipoVariavelIdFT");

            migrationBuilder.CreateIndex(
                name: "IX_Lmss_ConfiguracaoId",
                table: "Lmss",
                column: "ConfiguracaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Lmss_TipoVariavelId",
                table: "Lmss",
                column: "TipoVariavelId");

            migrationBuilder.CreateIndex(
                name: "IX_Lmss_TipoVariavelIdFT",
                table: "Lmss",
                column: "TipoVariavelIdFT");

            migrationBuilder.CreateIndex(
                name: "IX_Plcs_ConfiguracaoId",
                table: "Plcs",
                column: "ConfiguracaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Plcs_TipoVariavelId",
                table: "Plcs",
                column: "TipoVariavelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Historians");

            migrationBuilder.DropTable(
                name: "IgSs");

            migrationBuilder.DropTable(
                name: "Lmss");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Ambevs");

            migrationBuilder.DropTable(
                name: "Plcs");

            migrationBuilder.DropTable(
                name: "UMs");

            migrationBuilder.DropTable(
                name: "Configuracoes");

            migrationBuilder.DropTable(
                name: "TipoVariaveis");
        }
    }
}
