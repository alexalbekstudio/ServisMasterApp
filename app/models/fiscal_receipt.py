import uuid
from datetime import datetime
from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.database import Base


class FiscalReceipt(Base):
    __tablename__ = "fiscal_receipts"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    work_order_id = Column(UUID(as_uuid=True), ForeignKey("work_orders.id", ondelete="CASCADE"), nullable=False)
    receipt_number = Column(String(50), nullable=False)
    total_amount = Column(Numeric(12, 2), nullable=False)
    tax_base = Column(Numeric(12, 2), nullable=False)
    vat_amount = Column(Numeric(12, 2), nullable=False)
    vat_rate = Column(Numeric(5, 2), default=20.00)
    pfr_response = Column(JSONB, nullable=True)
    pfr_status = Column(String(20), default="PENDING")
    verification_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    work_order = relationship("WorkOrder", back_populates="fiscal_receipt")